from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get database URL from environment or use default SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./agri_advisor.db")

print(f"📦 Database: {DATABASE_URL}")

# Create engine with SQLite-specific settings
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=False  # Set to True for SQL query logging
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()


# Dependency for getting DB session
def get_db():
    """
    Database session dependency
    Usage: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Initialize database tables
def init_db():
    """
    Create all database tables
    Call this when starting the application
    """
    print("🔨 Creating database tables...")
    
    # Import all models to register them with Base
    import models
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    print("✅ Database initialized successfully!")


# Optional: Database reset (for development)
def reset_db():
    """
    ⚠️ WARNING: This drops all tables and recreates them!
    Use only in development!
    """
    import models
    
    print("⚠️  Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    
    print("🔨 Recreating tables...")
    Base.metadata.create_all(bind=engine)
    
    print("✅ Database reset complete!")


# Database health check
def check_db_connection():
    """Check if database connection is working"""
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        db.close()
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False