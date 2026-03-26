from fastapi import FastAPI
from dotenv import load_dotenv
import os

app = FastAPI()

@app.get("/")
def root():
    return {"message": "FastAPI MongoDB App Running 🚀"}