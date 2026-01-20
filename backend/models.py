from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="farmer")  # farmer, admin, official

    fields = relationship("Field", back_populates="owner")

class Field(Base):
    __tablename__ = "fields"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    district = Column(String)
    area_ha = Column(Float)
    latitude = Column(Float)
    longitude = Column(Float)
    crop_type = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="fields")
    crop_data = relationship("CropData", back_populates="field")
    advisories = relationship("Advisory", back_populates="field")

class CropData(Base):
    __tablename__ = "crop_data"

    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id"))
    date = Column(DateTime)
    ndvi = Column(Float)
    rainfall = Column(Float)
    temperature = Column(Float)
    soil_moisture = Column(Float)
    
    field = relationship("Field", back_populates="crop_data")

class Advisory(Base):
    __tablename__ = "advisories"

    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id"))
    date = Column(DateTime, default=datetime.datetime.utcnow)
    content = Column(Text)
    priority = Column(String)  # low, medium, high
    category = Column(String)  # irrigation, fertilizer, pest

    field = relationship("Field", back_populates="advisories")
