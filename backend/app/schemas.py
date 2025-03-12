from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: str

class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    mobile_number: str
    role: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    disabled: bool=False
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class RequestCreate(BaseModel):
    title: str
    description: str
    request_type: str
    location_lat: float
    location_lon: float

class RequestResponse(BaseModel):
    id: int
    title: str
    description: str
    request_type: str
    location_lat: float
    location_lon: float
    is_confirmed: bool

    class Config:
        from_attributes = True

class ResourceCreate(BaseModel):
    resource_type: str
    description: str
    location_lat: float
    location_lon: float

class ResourceResponse(BaseModel):
    id: int
    resource_type: str
    location_lat: float
    location_lon: float

    class Config:
        from_attributes = True

class RequestUpdate(BaseModel):
    is_confirmed: bool


class MessageSchema(BaseModel):
    subject: str
    message: str
    recipient_email: str
    body: str

    class Config:
        from_attributes = True