from fastapi import HTTPException, status, APIRouter, Depends
from sqlmodel import select
from .. import models, schemas, utils, database
from ..oauth2 import create_token
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

auth_router = APIRouter(
    tags=["auth"]
)

@auth_router.post("/register", response_model=schemas.UserResponse)
async def register_user(user: schemas.UserCreate, db: database.SessionLocal):
    valid_roles = ["user", "volunteer"]
    if user.role not in valid_roles:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role selected")

    hashed_password = utils.get_password_hash(user.password)
    db_user = models.User(firstname=user.firstname, lastname=user.lastname, email=user.email, mobile_number=user.mobile_number, role = user.role, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

@auth_router.post("/login", response_model=schemas.Token)
def login_user(db: database.SessionLocal, user: OAuth2PasswordRequestForm = Depends()):
    db_user = db.exec(select(models.User).where(models.User.email == user.username)).first()
    if not db_user or not utils.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_token({"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}