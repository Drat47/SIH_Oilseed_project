from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    fields = relationship("Field", back_populates="owner")

class Field(Base):
    __tablename__ = "fields"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    area = Column(Float, nullable=False)
    crop_type = Column(String, nullable=False)
    location = Column(JSON, nullable=False)  # {lat, lng}
    polygon = Column(JSON, nullable=False)  # Array of [lat, lng]
    soil_type = Column(String)
    irrigation_type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="fields")
    ndvi_data = relationship("NDVIData", back_populates="field")
    weather_data = relationship("WeatherData", back_populates="field")
    soil_data = relationship("SoilData", back_populates="field")
    advisories = relationship("Advisory", back_populates="field")

class NDVIData(Base):
    __tablename__ = "ndvi_data"
    
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    ndvi_value = Column(Float, nullable=False)
    source = Column(String)  # e.g., "Sentinel-2", "Landsat-8"
    
    field = relationship("Field", back_populates="ndvi_data")

class WeatherData(Base):
    __tablename__ = "weather_data"
    
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    temperature = Column(Float)  # Celsius
    humidity = Column(Float)  # Percentage
    rainfall = Column(Float)  # mm
    wind_speed = Column(Float)  # km/h
    
    field = relationship("Field", back_populates="weather_data")

class SoilData(Base):
    __tablename__ = "soil_data"
    
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    ph = Column(Float)
    nitrogen = Column(Float)  # kg/ha
    phosphorus = Column(Float)  # kg/ha
    potassium = Column(Float)  # kg/ha
    organic_carbon = Column(Float)  # percentage
    
    field = relationship("Field", back_populates="soil_data")

class Advisory(Base):
    __tablename__ = "advisories"
    
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    recommendations = Column(JSON, nullable=False)  # Array of strings
    priority = Column(String)  # High, Medium, Low
    expected_impact = Column(String)
    
    field = relationship("Field", back_populates="advisories")