from sqlalchemy import TIMESTAMP, Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship
from .database import Base

# User table model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, unique=True, index=True)
    mobile_number = Column(String)
    role = Column(String, default="user")  # user, admin, volunteer
    hashed_password = Column(String)

    requests = relationship('Request', back_populates='user', foreign_keys='Request.user_id')
    resources = relationship('Resource', back_populates='user')
    requests_volunteered = relationship("Request", back_populates="volunteer", foreign_keys='Request.volunteer_id')


# Request table model
class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)  # Request title
    description = Column(Text, nullable=True)
    request_type = Column(String, nullable=False)  # e.g., "food", "medical", "shelter"
    location_lat = Column(Float, nullable=False)
    location_lon = Column(Float, nullable=False)
    is_confirmed = Column(Boolean, default=False)  # pending, in-progress, resolved
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())  # Timestamp
    volunteer_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    user = relationship("User", back_populates="requests", foreign_keys=[user_id])
    volunteer = relationship("User", back_populates="requests_volunteered", foreign_keys=[volunteer_id])


# Resource table model
class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    resource_type = Column(String, nullable=False)  # e.g., "water", "clothes"
    description = Column(Text, nullable=True)  # Additional details
    location_lat = Column(Float, nullable=False)
    location_lon = Column(Float, nullable=False)
    is_available = Column(Boolean, default=True)  # Resource availability
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())  # Timestamp

    user = relationship("User", back_populates="resources")
