from fastapi import APIRouter, status, Response, Request, Depends
from dotenv import load_dotenv
import os
from ..schemas.req_body import RegisterReqSchema, LoginReqSchema, SuspendUserSchema
from ..schemas.super_resp import RegisterSuperAdminRespSchema
from ..schemas.resp_body import CreateAdminRespSchema, SuspendedAdminSchema, LogoutSchema, LoginRespSchema
from ..middleware.auth_middleware import is_logged_in, restrict_unautharised_access


from ..controllers.auth_controller import test, register, create_admin, login, suspend, logout, enter

load_dotenv()

authRouter = APIRouter(prefix='/auth', tags=['AUTH'])

REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET")
REFRESH_TOKEN_EXPIRY = os.getenv("REFRESH_TOKEN_EXPIRY")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")
ACCESS_TOKEN_EXPIRY = os.getenv("ACCESS_TOKEN_EXPIRY")

@authRouter.get('/test', status_code=status.HTTP_200_OK)
async def root():
    return await test()

@authRouter.post('/register', response_model=RegisterSuperAdminRespSchema, status_code=status.HTTP_200_OK)
async def root(payload: RegisterReqSchema):
    return await register(payload)

@authRouter.post('/create_role', response_model=CreateAdminRespSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(restrict_unautharised_access)])
async def root(payload: RegisterReqSchema, req: Request, resp: Response):
    return await create_admin(payload, req, resp)

@authRouter.post('/login', response_model=LoginRespSchema, status_code=status.HTTP_200_OK)
async def root(payload:LoginReqSchema, response:Response):
    return await login(payload, response)

@authRouter.post('/suspend', response_model=SuspendedAdminSchema, status_code=status.HTTP_200_OK, dependencies=[Depends(restrict_unautharised_access)])
async def root(payload: SuspendUserSchema, req: Request):
    return await suspend(payload, req)

@authRouter.post('/logout', response_model=LogoutSchema, status_code=status.HTTP_200_OK, dependencies=[Depends(is_logged_in)])
async def root(req: Request, resp: Response):
    return await logout(req, resp)

@authRouter.post('/is-loggedin', response_model=RegisterSuperAdminRespSchema, status_code=status.HTTP_202_ACCEPTED, dependencies=[Depends(is_logged_in)])
async def root(req: Request, resp: Response):
    return await enter(req, resp)
