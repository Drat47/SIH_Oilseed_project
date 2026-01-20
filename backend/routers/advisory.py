from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas, database, auth
import requests
import os

router = APIRouter(
    prefix="/advisory",
    tags=["advisory"],
)

ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:5000")

@router.get("/{field_id}", response_model=List[schemas.Advisory])
def read_advisories(field_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    # Verify ownership
    # (Skip complex check for MVP)
    return crud.get_advisories(db, field_id=field_id)

@router.post("/{field_id}", response_model=schemas.Advisory)
def generate_advisory(field_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    # 1. Get field data
    # 2. Call ML service
    # 3. Save advisory
    
    # Mock ML call
    # response = requests.post(f"{ML_SERVICE_URL}/predict", json={"field_id": field_id})
    # prediction = response.json()
    
    # Mock logic
    advisory_content = "Irrigation recommended based on recent dry spell."
    advisory_data = schemas.AdvisoryCreate(
        content=advisory_content,
        priority="high",
        category="irrigation"
    )
    
    return crud.create_advisory(db=db, advisory=advisory_data, field_id=field_id)
