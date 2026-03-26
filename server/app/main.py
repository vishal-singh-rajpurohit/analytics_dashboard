from fastapi import FastAPI
from .config.db import init_db
from .models.db_models import Admin

app = FastAPI()

@app.on_event("startup")
def start_conn():
    init_db()

@app.get("/")
def root():
    
    return {"message": "FastAPI MongoDB App Running 🚀"}