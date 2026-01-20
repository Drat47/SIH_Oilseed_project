from database import SessionLocal
import models
import auth

def create_admin():
    db = SessionLocal()
    try:
        username = "admin"
        password = "password123"
        
        # Check if user exists
        existing_user = db.query(models.User).filter(models.User.username == username).first()
        if existing_user:
            print(f"User '{username}' already exists.")
            return

        # Create user
        hashed_password = auth.get_password_hash(password)
        db_user = models.User(username=username, hashed_password=hashed_password, role="admin")
        db.add(db_user)
        db.commit()
        print(f"Successfully created user '{username}' with password '{password}'")
        
    except Exception as e:
        print(f"Error creating user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
