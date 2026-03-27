from fastapi import FastAPI
from .config.db import init_db
from .models.db_models import Admin, Users
from .routes.user import userRouter
from .routes.auth import authRouter
from .routes.analytics import analyticsRouter
from .routes.contacts import contactsRouter
from .routes.reports import reportsRouter

app = FastAPI()

app.include_router(userRouter, prefix="/api/v1")
app.include_router(authRouter, prefix="/api/v1")
app.include_router(analyticsRouter, prefix="/api/v1")
app.include_router(contactsRouter, prefix="/api/v1")
app.include_router(reportsRouter, prefix="/api/v1")

@app.on_event("startup")
def start_conn():
    init_db()

@app.get("/")
def root():
    return {"message": "FastAPI MongoDB App Running 🚀"}

