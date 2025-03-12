from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.middleware.cors import CORSMiddleware
#from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, utils, database
from .oauth2 import create_access_token, get_current_user, oauth2_scheme
from .routes.auth import auth_router
from .routes.Request_and_resource import req_router
from .routes.websockets import ws_router
from .routes.confirm import confirmation_router

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers (you can customize this too)
)


app.include_router(auth_router)
app.include_router(req_router)
app.include_router(ws_router)
app.include_router(confirmation_router)

