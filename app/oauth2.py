from jose import jwt, JWTError
from datetime import datetime, timedelta
from . import models, database, schemas
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .config import settings
from sqlmodel import select

oauth2_scheme = OAuth2PasswordBearer(tokenUrl= "login")

SECRET_KEY = settings.secret_key
ALGORTIHM = settings.algorithm
EXPIRATION_TIME = settings.access_token_expire_minutes

def create_token(payload: dict):
    expire =  datetime.utcnow() + timedelta(minutes= EXPIRATION_TIME)
    payload.update({"exp":expire})
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORTIHM)
    return token

def verify_token(token: str, credentials_error):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORTIHM])
        mail = payload.get("sub")
        if mail == None:
            raise credentials_error

        user_email =schemas.TokenData(email=mail)

    except JWTError:
        raise credentials_error
    
    return user_email

def get_current_user(db: database.SessionLocal, token = Depends(oauth2_scheme)):
    credentials_error = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credentials Could not be verified", headers={"WWW_Authenticate":"Bearer"})

    payload = verify_token(token, credentials_error)

    user = db.exec(select(models.User).where(models.User.email == payload.email)).first()

    return user