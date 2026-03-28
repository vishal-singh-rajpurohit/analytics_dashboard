from fastapi import APIRouter, status, HTTPException, Response, Request, Depends
from ..models.db_models import Admin
from ..schemas.req_body import RegisterReqSchema, LoginReqSchema, SuspendUserSchema
from ..schemas.super_resp import RegisterSuperAdminRespSchema
from ..schemas.resp_body import CreateAdminRespSchema, SuspendedAdminSchema, LogoutSchema
from ..utils.hash import verify_password
from ..utils.token import genrate_token, decrypt_token, TokenPayload
from ..middleware.auth_middleware import is_logged_in, restrict_unautharised_access
from dotenv import load_dotenv
import os

load_dotenv()

authRouter = APIRouter(prefix='/auth', tags=['AUTH'])


REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET")
REFRESH_TOKEN_EXPIRY = os.getenv("REFRESH_TOKEN_EXPIRY")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")
ACCESS_TOKEN_EXPIRY = os.getenv("ACCESS_TOKEN_EXPIRY")

@authRouter.post('/register', response_model=RegisterSuperAdminRespSchema, status_code=status.HTTP_200_OK)
async def register(payload: RegisterReqSchema):

    if not payload.name or not payload.email or not payload.password or not payload.superiorAdminId or not payload.mobile or not payload.role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "all data must required"
            })
    
    is_exists = Admin.objects(email=payload.email).first()

    if is_exists != None:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail={
                'message': 'Email is already in use'
            })
    
    admin = Admin(
        name=payload.name,
        email=payload.email,
        mobile=payload.mobile,
        password=payload.password,
        role="super"
        )

    admin.save()

    new_admin = Admin.objects(email=admin.email).first()

    if not new_admin:
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail={
            'message': 'cannot save to the database'
        })
    

    return RegisterSuperAdminRespSchema(
        message='Done',
        id=str(admin.id),
        email= admin.email,
        name= admin.name,
        mobile= admin.mobile,
        role=admin.role
    )

@authRouter.post('/create_role', response_model=CreateAdminRespSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(restrict_unautharised_access)])
async def create_admin(payload: RegisterReqSchema, req: Request, resp: Response):

    if not req.state.is_admin:
        raise HTTPException(
            status_code=status.HTTP_401_BAD_REQUEST,
            detail={
                "message": "Unautharised Accesss"
            })

    if not payload.name or not payload.email or not payload.password or not payload.mobile or not payload.role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "all data must required"
            })
    
    access_token = req.cookies.get("ACCESS_TOKEN")

    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "messagge": "Unautharised access"
            }
        )

    decoded_data = decrypt_token(token=access_token, secret_key=ACCESS_TOKEN_SECRET)

    if not decoded_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "messagge": "Unautharised access"
            }
        )
    
    is_user = Admin.objects(email=payload.email).first()

    if is_user != None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Email is already in use"
            })
    
    superiso_admin = Admin.objects(id=decoded_data['id']).first()
    
    if not superiso_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "You are not a superior admin"
            })

    admin = Admin(
        name=payload.name,
        superior = str(superiso_admin.id),
        email=payload.email,
        mobile=payload.mobile,
        password=payload.password,
        role=payload.role)
    
    admin.save()

    is_created = Admin.objects(email=admin.email).first()

    if not is_created.email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "user does not saved"
            })
    
    """
        # Send mail to the new Admin
    """

    return CreateAdminRespSchema(
        message='Done',
        email= admin.email,
        name= admin.name,
        mobile= admin.mobile,
        role=admin.role,
        password=payload.password
    )

@authRouter.post('/login', response_model=RegisterSuperAdminRespSchema, status_code=status.HTTP_200_OK)
async def login(payload:LoginReqSchema, response:Response):
    if not payload.email or not payload.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Add data must required"
            })
    
    is_user = Admin.objects(email=payload.email).first()

    if not is_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Email is already in use"
            })
    
    if is_user.isSuspended:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Your account has been suspended"
            })
    
    is_password_correct = verify_password(payload.password, is_user.password)

    if not is_password_correct:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Password is incorrect'
            }
        )
    

    access_tokens = genrate_token(TokenPayload(id=str(is_user.id), email=is_user.email, mobile=is_user.mobile), ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY)

    refresh_tokens = genrate_token(TokenPayload(id=str(is_user.id), email=is_user.email, mobile=is_user.mobile), REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY)

    decoded_data = decrypt_token(access_tokens, ACCESS_TOKEN_SECRET)

    Admin.objects(id=decoded_data['id']).update_one(set__refreshToken=refresh_tokens)

    if not decoded_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Aunautharised Access'
            })
    
    response.set_cookie(key='ACCESS_TOKEN', value=access_tokens)
    response.set_cookie(key='REFRESH_TOKEN', value=refresh_tokens)

    return RegisterSuperAdminRespSchema(
        message='Done',
        id= str(is_user.id),
        email= is_user.email,
        name= is_user.name,
        mobile= is_user.mobile,
        role=is_user.role
    )

@authRouter.post('/suspend', response_model=SuspendedAdminSchema, status_code=status.HTTP_200_OK, dependencies=[Depends(restrict_unautharised_access)])
async def suspend(payload: SuspendUserSchema, req: Request):

    if not req.state.is_admin:
        raise HTTPException(
            status_code=status.HTTP_401_BAD_REQUEST,
            detail={
                "message": "Unautharised Accesss"
            })

    if not payload.email :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Admin Id not found"
            })
    
    admin = Admin.objects(email=payload.email).first()

    if not admin.email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Email is already in use"
            })
    
    updated_admin = Admin.objects(email=payload.email).update_one(set__isSuspended=True)

    print("updated one: ", updated_admin)

    if not updated_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "User does not suspended"
            })
    
    return SuspendedAdminSchema(
        message="User Suspended"
    )

@authRouter.post('/logout', response_model=LogoutSchema, status_code=status.HTTP_200_OK, dependencies=[Depends(is_logged_in)])
async def logout(req: Request, resp: Response):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "messagge": "Unautharised access"
            }
        )
    
    resp.delete_cookie("ACCESS_TOKEN")
    resp.delete_cookie("REFRESH_TOKEN")

    return LogoutSchema(message="Loggged Out")

@authRouter.post('/is-loggedin', response_model=RegisterSuperAdminRespSchema, status_code=status.HTTP_202_ACCEPTED, dependencies=[Depends(is_logged_in)])
async def enter(req: Request, resp: Response):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "messagge": "Unautharised access"
            }
        )
    
    access_token = req.cookies.get("ACCESS_TOKEN")

    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "messagge": "Unautharised access"
            }
        )

    decoded_data = decrypt_token(token=access_token, secret_key=ACCESS_TOKEN_SECRET)

    if not decoded_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "messagge": "Unautharised access"
            }
        )
    
    user = Admin.objects(email=decoded_data['email']).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "messagge": "User not found"
            }
        )
    
    access_tokens_new = genrate_token(TokenPayload(id=str(user.id), email=user.email, mobile=user.mobile), ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY)

    refresh_tokens = genrate_token(TokenPayload(id=str(user.id), email=user.email, mobile=user.mobile), REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY)

    decoded_data = decrypt_token(access_tokens_new, ACCESS_TOKEN_SECRET)

    Admin.objects(id=decoded_data['id']).update_one(set__refreshToken=refresh_tokens)

    if not decoded_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Aunautharised Access'
            })
    
    resp.set_cookie(key='ACCESS_TOKEN', value=access_tokens_new)
    resp.set_cookie(key='REFRESH_TOKEN', value=refresh_tokens)

    return RegisterSuperAdminRespSchema(
        message='Done',
        id= str(user.id),
        email= user.email,
        name= user.name,
        mobile= user.mobile,
        role=user.role
    )
