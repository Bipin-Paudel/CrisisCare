from fastapi_mail import FastMail, MessageSchema
from fastapi.templating import Jinja2Templates

from . import confirm
from ..config import Config
from ..models import User, Request
from ..utils import find_best_match
from ..database import get_db
from .websockets import manager, notify_match
from sqlalchemy.orm import Session
from fastapi import BackgroundTasks, APIRouter, Depends, HTTPException
import os
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, APIRouter, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema
from sqlalchemy.orm import Session
from .. import models, schemas, utils, database
from ..oauth2 import oauth2_scheme, verify_token
from ..database import get_db
from ..models import User, Request
from ..utils import find_best_match
from .websockets import manager, notify_match

req_router = APIRouter(
    tags=["Requests and Resources"]
)

# templates = Jinja2Templates(directory=config.TEMPLATE_FOLDER)
# try:
#     templates.get_template('email_template.html')
#     print("Template loaded successfully!")
# except Exception as e:
#     print(f"Error loading template: {str(e)}")

# Add a new victim request
@req_router.post("/requests", response_model=schemas.RequestResponse)
async def add_request(request: schemas.RequestCreate, db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)):
    # Verify user from token
    user = db.query(models.User).filter(models.User.email == verify_token(token)["sub"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create and add request to the database
    db_request = models.Request(
        title=request.title,
        description=request.description,
        request_type=request.request_type,
        location_lat=request.location_lat,
        location_lon=request.location_lon,
        user_id=user.id,
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    # Broadcast request to all connected clients (e.g., WebSocket)
    await manager.broadcast({
        "type": "db_request",
        "id": db_request.id,
        "title": db_request.title,
        "location": [db_request.location_lat, db_request.location_lon]
    })

    # Get all volunteers in the database
    volunteers = db.query(models.User).filter(models.User.role == "volunteer").all()

    if not volunteers:
        raise HTTPException(status_code=404, detail="No volunteers found")

    # Notify volunteers about the new request
    try:
        for volunteer in volunteers:
            await confirm.send_confirmation_email(volunteer.id, db_request, db)
    except Exception as a:
        print(a)
        raise HTTPException(status_code=500, detail="Error notifying volunteers")

    return db_request


# Get all active victim requests
@req_router.get("/requests", response_model=List[schemas.RequestResponse])
def get_requests(db: Session = Depends(database.get_db)):
    return db.query(models.Request).filter(models.Request.is_confirmed == False).all()

# Add a new resource (donor)
@req_router.post("/resources", response_model=schemas.ResourceResponse)
async def add_resource(resource: schemas.ResourceCreate, db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)):
    user = db.query(models.User).filter(models.User.email == verify_token(token)["sub"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    db_resource = models.Resource(
        resource_type=resource.resource_type,
        location_lat=resource.location_lat,
        location_lon=resource.location_lon,
        user_id=user.id
    )
    
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)

    await manager.broadcast({
        "type": "new_resource",
        "id": db_resource.id,
        "resource_type": db_resource.resource_type,
        "location": [db_resource.location_lat, db_resource.location_lon]
    })


    return db_resource

# Get all available resources
@req_router.get("/resources", response_model=List[schemas.ResourceResponse])
def get_resources(db: Session = Depends(database.get_db)):
    return db.query(models.Resource).all()

@req_router.put("/requests/{request_id}/status")
def update_request_status(request_id: int, is_confirmed: bool, db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)):
    user = db.query(models.User).filter(models.User.email == verify_token(token)["sub"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    request = db.query(models.Request).filter(models.Request.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    if status not in ["pending", "in-progress", "resolved"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    request.status = status
    db.commit()
    return {"message": "Status updated", "new_status": status}

@req_router.get("/requests", response_model=List[schemas.RequestResponse])
def get_requests(request_type: Optional[str] = None, db: Session = Depends(database.get_db)):
    query = db.query(models.Request).filter(models.Request.is_confirmed == False)
    if request_type:
        query = query.filter(models.Request.request_type == request_type)
    return query.all()

@req_router.get("/resources", response_model=List[schemas.ResourceResponse])
def get_resources(resource_type: Optional[str] = None, db: Session = Depends(database.get_db)):
    query = db.query(models.Resource)
    if resource_type:
        query = query.filter(models.Resource.resource_type == resource_type)
    return query.all()

@req_router.put("/requests/{request_id}/status")
def update_request_status(request_id: int, status: str, db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)):
    user = db.query(models.User).filter(models.User.email == verify_token(token)["sub"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    request = db.query(models.Request).filter(models.Request.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    if status not in ["pending", "in-progress", "resolved"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    request.status = status
    db.commit()
    return {"message": "Status updated", "new_status": status}

@req_router.get("/requests/{request_id}/nearest_resources", response_model=List[schemas.ResourceResponse])
def get_nearest_resources(request_id: int, radius: Optional[float] = 50, resource_type: Optional[str] = None, db: Session = Depends(database.get_db)):
    # Get the victim request from the database
    request = db.query(models.Request).filter(models.Request.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Get all available resources
    resources = db.query(models.Resource)
    if resource_type:
        resources = resources.filter(models.Resource.resource_type == resource_type)
    resources = resources.all()
    
    # Filter resources based on distance
    nearby_resources = []
    for resource in resources:
        distance = utils.calculate_distance(request.location_lat, request.location_lon, resource.location_lat, resource.location_lon)
        if distance <= radius:
            nearby_resources.append((resource, distance))
    
    # Sort by distance (ascending)
    nearby_resources.sort(key=lambda x: x[1])
    
    # Only return resources, not the distance
    return [resource for resource, _ in nearby_resources]

@req_router.post("/match/{request_id}")
def match_request(request_id: int, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    request = db.query(Request).filter(Request.id == request_id, Request.is_confirmed == False).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found or already matched")

    best_match = find_best_match(request_id, db)

    if not best_match:
        raise HTTPException(status_code=404, detail="No matching resources available")

    request.is_confirmed = True
    best_match.is_available = False
    db.commit()

    # Send real-time notifications
    background_tasks.add_task(notify_match, request.id, best_match.id)

    return {
        "message": "Match found!",
        "request_id": request.id,
        "resource_id": best_match.id,
        "donor_id": best_match.user_id,
        "location": {"lat": best_match.location_lat, "lon": best_match.location_lon}
    }
