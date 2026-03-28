# from mongoengine import
from pydantic import BaseModel


class CreateAdminRespSchema(BaseModel):
    message: str
    name: str
    email: str
    mobile: str
    role: str
    password: str

    class Config:
        from_attributes = True

class SuspendedAdminSchema(BaseModel):
    message: str

    class Config:
        from_attributes = True

class GetSingleUserSchema(BaseModel):
    message: str
    userId: str
    userName: str
    searchTag: str
    email: str
    avatar: str
    online: str
    
    class Config:
        from_attributes = True


class CreatedBySchema(BaseModel):
    userName: str
    searchTag: str

    class Config:
        from_attributes = True

class GetSingleContactSchema(BaseModel):
    message: str
    contactId: str
    oneOnOne: list
    createdBy: CreatedBySchema
    isGroup: bool
    groupAvatar: str
    groupName: str
    whoCanSend: str
    description: str
    
    class Config:
        from_attributes = True

class GetSingleReport(BaseModel):
    reportId: str
    userId: str
    contactId: str
    message: str
    reportType: str
    class Config:
        from_attributes = True


class LogoutSchema(BaseModel):
    message: str

    class Config:
        from_attributes = True