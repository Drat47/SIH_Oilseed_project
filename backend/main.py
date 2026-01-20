from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Oilseed Advisory Platform")

# CORS setup
origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Oilseed Advisory Platform API"}

from routers import auth, fields, advisory, weather, market

app.include_router(auth.router)
app.include_router(fields.router)
app.include_router(advisory.router)
app.include_router(weather.router)
app.include_router(market.router)

