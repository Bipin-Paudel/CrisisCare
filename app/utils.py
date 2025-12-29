from passlib.context import CryptContext
from . import database
from geopy.distance import geodesic
#from math import radians, sin, cos, sqrt, atan2
from .models import Request, Resource
from sqlmodel import select

pwd_context = CryptContext(schemes=["bcrypt"], deprecated=["auto"])

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

"""def get_user_by_email(db, email):
    return db.query(models.User).filter(models.User.email == email).first()"""

def calculate_distance(lat1, lon1, lat2, lon2):
    point1 = (lat1, lon1)
    point2 = (lat2, lon2)
    return geodesic(point1, point2).kilometers

"""# Function to calculate distance (Haversine formula)
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c  # Distance in km"""

# Function to find the best match
def find_best_match(request_id: int, db: database.SessionLocal):
    request = db.exec(select(Request).where(Request.id == request_id, Request.is_confirmed == False)).first()
    if not request:
        return None  # No valid request found

    available_resources = db.exec(select(Resource).where(
        Resource.resource_type == request.request_type, 
        Resource.is_available == True
    )).all()

    best_match = None
    min_distance = float("inf")# inf = infinity

    for resource in available_resources:
        distance = calculate_distance(request.location_lat, request.location_lon, resource.location_lat, resource.location_lon)
        if distance < min_distance:
            min_distance = distance
            best_match = resource

    return best_match