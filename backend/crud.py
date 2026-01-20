from sqlalchemy.orm import Session
import models, schemas, auth

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_fields(db: Session, skip: int = 0, limit: int = 100, user_id: int = None):
    query = db.query(models.Field)
    if user_id:
        query = query.filter(models.Field.owner_id == user_id)
    return query.offset(skip).limit(limit).all()

def create_field(db: Session, field: schemas.FieldCreate, user_id: int):
    db_field = models.Field(**field.dict(), owner_id=user_id)
    db.add(db_field)
    db.commit()
    db.refresh(db_field)
    return db_field

def create_advisory(db: Session, advisory: schemas.AdvisoryCreate, field_id: int):
    db_advisory = models.Advisory(**advisory.dict(), field_id=field_id)
    db.add(db_advisory)
    db.commit()
    db.refresh(db_advisory)
    return db_advisory

def get_advisories(db: Session, field_id: int):
    return db.query(models.Advisory).filter(models.Advisory.field_id == field_id).all()
