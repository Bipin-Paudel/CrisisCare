from fastapi import FastAPI
from .routes.auth import auth_router
from .routes.Request_and_resource import req_router
from .routes.confirm import confirmation_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins=["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(req_router)
app.include_router(confirmation_router)

