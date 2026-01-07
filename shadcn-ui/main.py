from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta
import models
import schemas
import auth
from database import engine, get_db, init_db
from ml.predict import predict_yield, generate_advisory

# Create database tables
init_db()

app = FastAPI(title="AgriAdvisor API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "AgriAdvisor API - AI-Enabled Precision Advisory Platform"}


#  Authentication endpoints (FINAL)

@app.post("/api/auth/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name,
        phone=user.phone,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Create access token
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    #  Convert ORM -> Pydantic
    user_response = schemas.UserResponse.from_orm(db_user)

    return schemas.Token(
        access_token=access_token,
        token_type="bearer",
        user=user_response,
    )


@app.post("/api/auth/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    # Convert ORM -> Pydantic
    user_response = schemas.UserResponse.from_orm(db_user)

    return schemas.Token(
        access_token=access_token,
        token_type="bearer",
        user=user_response,
    )

@app.post("/api/auth/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": db_user
    }

# Field endpoints
@app.get("/api/fields", response_model=List[schemas.FieldResponse])
def get_fields(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    fields = db.query(models.Field).filter(models.Field.user_id == current_user.id).all()
    return fields

@app.get("/api/fields/{field_id}", response_model=schemas.FieldResponse)
def get_field(
    field_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    field = db.query(models.Field).filter(
        models.Field.id == field_id,
        models.Field.user_id == current_user.id
    ).first()
    
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    
    return field

@app.post("/api/fields", response_model=schemas.FieldResponse)
def create_field(
    field: schemas.FieldCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_field = models.Field(
        user_id=current_user.id,
        **field.dict()
    )
    db.add(db_field)
    db.commit()
    db.refresh(db_field)
    return db_field

# ML endpoints
@app.post("/api/predict_yield", response_model=schemas.YieldPredictionResponse)
def predict_field_yield(
    request: schemas.YieldPredictionRequest,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # Verify field belongs to user
    field = db.query(models.Field).filter(
        models.Field.id == request.field_id,
        models.Field.user_id == current_user.id
    ).first()
    
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    
    # Get prediction
    prediction = predict_yield(field.id, db)
    return prediction

@app.get("/api/advisory/{field_id}", response_model=schemas.AdvisoryResponse)
def get_advisory(
    field_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # Verify field belongs to user
    field = db.query(models.Field).filter(
        models.Field.id == field_id,
        models.Field.user_id == current_user.id
    ).first()
    
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    
    # Get or generate advisory
    advisory = db.query(models.Advisory).filter(
        models.Advisory.field_id == field_id
    ).order_by(models.Advisory.date.desc()).first()
    
    if not advisory:
        # Generate new advisory
        advisory_data = generate_advisory(field_id, db)
        advisory = models.Advisory(
            field_id=field_id,
            **advisory_data
        )
        db.add(advisory)
        db.commit()
        db.refresh(advisory)
    
    return advisory

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)