from pydantic import BaseModel

class GetItemSchema(BaseModel):
    count: int
    page: int

class RegisterReqSchema(BaseModel):
    name:str
    superiorAdminId: str
    email: str
    mobile: str
    password: str
    role: str

class LoginReqSchema(BaseModel):
    email: str
    password: str

class LoginOtpReqSchema(BaseModel):
    email: str
    password: str
    otp: int

class IdSchema(BaseModel):
    id: str

class NotifyMessageSchema(BaseModel):
    id: str
    message: str

