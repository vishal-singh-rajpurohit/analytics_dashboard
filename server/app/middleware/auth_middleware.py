from fastapi import Request
from ..utils.token import decrypt_token
from ..models.db_models import Admin, RoleEnum
import os
from dotenv import load_dotenv

load_dotenv()

REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")

def is_logged_in(req: Request):
    access_token = req.cookies.get("ACCESS_TOKEN")

    if not access_token:
        req.state.is_authenticted = False
        return req.state.is_authenticted
    
    decoded_data = decrypt_token(token=access_token, secret_key=ACCESS_TOKEN_SECRET)

    if not decoded_data:
        req.state.is_authenticted = False
        return req.state.is_authenticted
    

    req.state.is_authenticted = True
    return req.state.is_authenticted

async def restrict_unautharised_access(req: Request):
    access_token = req.cookies.get("ACCESS_TOKEN")
    if not access_token:
        req.state.is_admin = False
        return req.state.is_admin
    
    decoded_data = decrypt_token(token=access_token, secret_key=ACCESS_TOKEN_SECRET)

    if not decoded_data:
        req.state.is_admin = False
        return req.state.is_admin
    
    admin = Admin.objects(id=decoded_data['id']).first()

    if not admin:
        req.state.is_admin = False
        return req.state.is_admin
    
    if admin.role != RoleEnum.SUPER_ADMIN:
        req.state.is_admin = False
        return req.state.is_admin
    
    req.state.is_admin = True
    return req.state.is_admin
