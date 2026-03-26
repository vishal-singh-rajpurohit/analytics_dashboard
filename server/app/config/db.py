import os
from dotenv import load_dotenv
from mongoengine import connect

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_CONNECTION_URI")
DB_NAME = os.getenv("DB_NAME")

def init_db():
    connect(
        db=DB_NAME,
        host=MONGODB_URI
    )

