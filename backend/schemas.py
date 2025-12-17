from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    phone: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    phone: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class FieldCreate(BaseModel):
    name: str
    area: float
    crop_type: str
    location: dict  # {lat: float, lng: float}
    polygon: List[List[float]]
    soil_type: str
    irrigation_type: str

class FieldResponse(BaseModel):
    id: int
    name: str
    area: float
    crop_type: str
    location: dict
    polygon: List[List[float]]
    soil_type: str
    irrigation_type: str
    
    class Config:
        from_attributes = True

class YieldPredictionRequest(BaseModel):
    field_id: int

class YieldPredictionResponse(BaseModel):
    field_id: int
    predicted_yield: float
    confidence: float
    factors: dict

class AdvisoryResponse(BaseModel):
    id: int
    field_id: int
    date: datetime
    recommendations: List[str]
    priority: str
    expected_impact: str
    
    class Config:
        from_attributes = True