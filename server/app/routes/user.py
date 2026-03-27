from fastapi import APIRouter
from ..schemas.req_body import get_user_schema

userRouter = APIRouter(prefix='/users', tags=['USER'])

@userRouter.get('/')
def root():
    return {"message": "Hii i am herer 🤣"}

@userRouter.post('/')
def post_get_user(payload: get_user_schema):
    pass

@userRouter.post('/suspend')
def suspend_user():
    pass

@userRouter.post('/notify')
def notify_user():
    pass
