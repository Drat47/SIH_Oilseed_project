from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas, database, auth

router = APIRouter(
    prefix="/fields",
    tags=["fields"],
)

@router.get("/", response_model=List[schemas.Field])
def read_fields(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return crud.get_fields(db, skip=skip, limit=limit, user_id=current_user.id)

@router.post("/", response_model=schemas.Field)
def create_field(field: schemas.FieldCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return crud.create_field(db=db, field=field, user_id=current_user.id)
