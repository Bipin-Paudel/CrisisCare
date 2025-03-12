import os
from fastapi_mail import ConnectionConfig
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Define your variables with default values
    database_hostname: str = "localhost"
    database_port: int = 5432
    database_username: str = "postgres"
    database_password: str = "password"
    database_name: str = "crisiscare"
    secret_key: str = "62e17aee1ba1babcc7cf88170c9433aec9b2c45c6e6be2d5100df7708cbc7493"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
settings = Settings()

from mailjet_rest import Client

class Config:  
    MAILJET_API_KEY = "438636ef5a547a6f9f4f88f3ef0b202f"
    MAILJET_API_SECRET = "e20ef4ac942e39795b418fe796229451"
    MAIL_FROM = "sudeepsigdel123@gmail.com"  # The email you're sending from

def send_email_via_mailjet(subject: str, body: str, to_email: str):
    api_key = '438636ef5a547a6f9f4f88f3ef0b202f'  # Replace with your Mailjet API key
    api_secret = 'e20ef4ac942e39795b418fe796229451'  # Replace with your Mailjet API secret
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')

    data = {
        'Messages': [
            {
                'From': {
                    'Email': 'sudeepsigdel123@gmail.com',  # Replace with your email
                    'Name': 'Sudeep Sigdel'  # Replace with your name
                },
                'To': [
                    {
                        'Email': to_email
                    }
                ],
                'Subject': subject,
                'TextPart': body,
                # You can also add HTML version of the body
                'HTMLPart': f"<h3>{body}</h3>"
            }
        ]
    }

    result = mailjet.send.create(data=data)
    
    if result.status_code == 200:
        print("Email sent successfully!")
        return result.json()
    else:
        print(f"Error sending email: {result.status_code} - {result.text}")
        return None
