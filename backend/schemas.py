from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Crop Data Schemas
class CropDataBase(BaseModel):
    date: datetime
    ndvi: float
    rainfall: float
    temperature: float
    soil_moisture: float

class CropDataCreate(CropDataBase):
    pass

class CropData(CropDataBase):
    id: int
    field_id: int
    class Config:
        orm_mode = True

# Advisory Schemas
class AdvisoryBase(BaseModel):
    content: str
    priority: str
    category: str

class AdvisoryCreate(AdvisoryBase):
    pass

class Advisory(AdvisoryBase):
    id: int
    field_id: int
    date: datetime
    class Config:
        orm_mode = True

# Field Schemas
class FieldBase(BaseModel):
    name: str
    district: str
    area_ha: float
    latitude: float
    longitude: float
    crop_type: str

class FieldCreate(FieldBase):
    pass

class Field(FieldBase):
    id: int
    owner_id: int
    crop_data: List[CropData] = []
    advisories: List[Advisory] = []
    class Config:
        orm_mode = True
