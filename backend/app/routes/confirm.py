import httpx
import logging
from fastapi import APIRouter, Depends, HTTPException
import requests
from ..models import User, Request
from ..database import get_db
from sqlalchemy.orm import Session
from ..config import Config
from mailjet_rest import Client

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

confirmation_router = APIRouter()

@confirmation_router.get("/confirm_request/{request_id}/{volunteer_id}", response_model=None)
async def confirm_request(request_id: int, volunteer_id: int, db: Session = Depends(get_db)):
    logger.info(f"Received volunteer_id: {volunteer_id}")

    request = db.query(Request).filter(Request.id == request_id).first()
    logger.info(f"Request: {request}")
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    volunteer = db.query(User).filter(User.id == volunteer_id, User.role == "volunteer").first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    
    if request.is_confirmed:
        return {"message": "This request has already been confirmed."}

    request.is_confirmed = True
    request.volunteer_id = volunteer_id
    db.commit()

    await notify_victim(request.id, db)
    await send_confirmation_email(volunteer.id, request, db)

    return {"message": "You have successfully confirmed the request!"}

async def send_confirmation_email(volunteer_id: int, request: Request, db: Session):
    volunteer = db.query(User).filter(User.id == volunteer_id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")

    confirmation_link = f"http://192.168.1.76:8000/confirm_request/{request.id}/{volunteer.id}"

    subject = "New Volunteer Request - Confirm Participation"
    body = f"""
    Hello {volunteer.firstname},

    You have been assigned to a new request titled "{request.title}".
    Please click the link below to confirm your participation:

    ✅ [Confirm Request]({confirmation_link})

    If you are unable to help, you may ignore this email.

    Best,
    CrisisCare Team
    """

    # Send email using Mailjet
    send_email(volunteer.email, subject, body)

async def notify_victim(request_id: int, db: Session):
    request = db.query(Request).filter(Request.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Notify the victim first
    victim = db.query(User).filter(User.id == request.user_id).first()
    if not victim:
        raise HTTPException(status_code=404, detail="Victim not found")

    volunteer = db.query(User).filter(User.id == request.volunteer_id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")

    # Notify the victim with the details
    subject = "Help is on the way!"
    body = f"""
    Hello {victim.firstname},

    A volunteer has confirmed your request: "{request.title}".
    Volunteer details:
    - Name: {volunteer.firstname}
    - Contact: {volunteer.email}

    Stay safe!
    CrisisCare Team
    """
    
    send_email(victim.email, subject, body)
    
    # Now notify all volunteers
    volunteers = db.query(User).filter(User.role == "volunteer").all()  # Get all volunteers
    if not volunteers:
        raise HTTPException(status_code=404, detail="No volunteers found")
    
    # Notify each volunteer about the request
    for volunteer in volunteers:
        subject = f"New Volunteer Request: {request.title}"
        body = f"""
        Hello {volunteer.firstname},

        A new request has been made titled "{request.title}".
        If you're available, please consider assisting the victim.

        Request details:
        - Title: {request.title}
        - Description: {request.description}
        - Location: {request.location_lat}, {request.location_lon}

        Stay safe!
        CrisisCare Team
        """
        send_email(volunteer.email, subject, body)

# Helper function to send emails using Mailjet API
def send_email(to_email: str, subject: str, body: str):
    api_key = Config.MAILJET_API_KEY  # Your Mailjet API Key
    api_secret = Config.MAILJET_API_SECRET  # Your Mailjet API Secret
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')

    data = {
        'Messages': [
            {
                'From': {
                    'Email': Config.MAIL_FROM,  # Your 'from' email address
                    'Name': "CrisisCare Team"
                },
                'To': [
                    {
                        'Email': to_email
                    }
                ],
                'Subject': subject,
                'TextPart': body,
                'HTMLPart': f"<h3>{body}</h3>"
            }
        ]
    }

    result = mailjet.send.create(data=data)
    
    if result.status_code == 200:
        print(f"Email sent successfully to {to_email}")
    else:
        print(f"Error sending email: {result.status_code} - {result.text}")
        raise HTTPException(status_code=500, detail="Error sending email with Mailjet")
