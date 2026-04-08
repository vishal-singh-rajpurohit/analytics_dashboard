from fastapi import APIRouter, Request, status, Depends
from ..middleware.auth_middleware import is_logged_in
from ..schemas.req_body import GetItemSchema, IdSchema
from ..schemas.resp_body import UserOverviewResopnseSchema, GetSingleUserSchema, SuspendUserSchema
from ..controllers.user_controller import get_users, get_user, suspend_user, activate_user, notify_user

# userRouter = APIRouter(prefix='/users', tags=['USER'], dependencies=[Depends(is_logged_in)])
userRouter = APIRouter(prefix='/users', tags=['USER'])

@userRouter.post('/', response_model=UserOverviewResopnseSchema, status_code=status.HTTP_200_OK)
async def root(req: Request, payload: GetItemSchema):
    return await get_users(req, payload)

@userRouter.get('/{id}', response_model=GetSingleUserSchema, status_code=status.HTTP_200_OK)
async def root(id: str, req: Request):
    return await get_user(id, req)

@userRouter.post('/suspend', response_model=SuspendUserSchema, status_code=status.HTTP_200_OK)
async def root(payload: IdSchema, req: Request):
    return await suspend_user(payload, req)

@userRouter.post('/re-activate', response_model=SuspendUserSchema, status_code=status.HTTP_200_OK)
async def root(payload: IdSchema, req: Request):
    return await activate_user(payload, req)

@userRouter.post('/notify', response_model=SuspendUserSchema, status_code=status.HTTP_200_OK)
async def root(payload: IdSchema, req: Request):
    return await notify_user(payload, req)
