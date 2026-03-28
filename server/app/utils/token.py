import jwt
import datetime
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

class TokenPayload(BaseModel):
    id: str
    email:str
    mobile:str


ALGO = os.getenv("ALGO")

def genrate_token(paylod:TokenPayload, secret_key:str, expiry: str)->str:
    data = {
        "id": paylod.id,
        "email": paylod.email,
        "mobile": paylod.mobile,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=int(expiry)),
        "iat": datetime.datetime.utcnow()
    }

    encoded_jwt = jwt.encode(data, secret_key, algorithm=ALGO)

    return encoded_jwt

def decrypt_token(token:str, secret_key: str):
    decoded_data = jwt.decode(token, secret_key, algorithms=[ALGO])
    return decoded_data


    