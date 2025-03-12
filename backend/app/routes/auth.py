from fastapi import FastAPI, Depends, HTTPException, Request, status, APIRouter
from fastapi_mail import FastMail, MessageSchema
from sqlalchemy.orm import Session

from .. import models, schemas, utils, database
from ..oauth2 import create_access_token, get_current_user

auth_router = APIRouter(
    tags=["auth"]
)

@auth_router.post("/register", response_model=schemas.UserResponse)
async def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    valid_roles = ["user", "volunteer"]
    if user.role not in valid_roles:
        raise HTTPException(status_code=400, detail="Invalid role selected")

    hashed_password = utils.get_password_hash(user.password)
    db_user = models.User(firstname=user.firstname, lastname=user.lastname, email=user.email, mobile_number=user.mobile_number, role = user.role, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

@auth_router.post("/login", response_model=schemas.Token)
def login_user(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not utils.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.get("/users/me", response_model=schemas.UserResponse)
def read_users_me(current_user: schemas.UserResponse = Depends(get_current_user)):
    return current_user 
