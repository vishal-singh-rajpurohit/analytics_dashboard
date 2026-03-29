# from mongoengine import
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from ..schemas.super_resp import RegisterSuperAdminRespSchema

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

class ContactsOverviewSchema(BaseModel):
    id: str = Field(alias="_id")
    createdAt: datetime
    contactType: str
    members: List[str]

    class Config:
        populate_by_name = True
        from_attributes = True

class ContactsOverviewResponseSchema(BaseModel):
    message: str
    contacts: List[ContactsOverviewSchema]

    class Config:
        from_attributes = True

class UserOverviewSchema(BaseModel):
    id: str = Field(alias="_id")
    searchTag: str
    online: bool
    
    class Config:
        populate_by_name = True
        from_attributes = True
    
class UserOverviewResopnseSchema(BaseModel):
    message: str
    users: List[UserOverviewSchema]
    
    class Config:
        from_attributes = True
    
class ReportOverviewSchema(BaseModel):
    id: str = Field(alias='_id')
    reportType: str
    message: str
    createdAt: datetime
    
    class Config:
        populate_by_name = True
        from_attributes = True
    
class ReportOverviewResponseSchema(BaseModel):
    message: str
    reports: List[ReportOverviewSchema]
    
    class Config:
        from_attributes = True
    
class LoginRespSchema(BaseModel):
    message: str
    id: str
    message: str
    name: str
    email: str
    mobile: str
    role: str
    users: List[UserOverviewSchema]
    reports: List[ReportOverviewSchema]
    contacts: List[ContactsOverviewSchema]
    
    class Config:
        from_attributes = True

class SingleReportSchema(BaseModel):
    id: str = Field(alias='_id')
    userId: str
    contactId: str
    type: str = Field(alias='reportType')
    message: str
    createdAt: datetime

    class Config:
        populate_by_name = True
        from_attributes = True

class GetSingleReportRespSchema(BaseModel):
    message: str
    report: SingleReportSchema

    class Config:
        from_attributes = True

class SingleContactSchema(BaseModel):
    id: str = Field(alias='_id')
    oneOnOne: list[str]
    isGroup: bool
    lastMessage: str
    createdAt: datetime

    class Config:
        populate_by_name = True
        from_attributes = True
    
class GetSingleContactRespSchema(BaseModel):
    message: str
    contact: SingleContactSchema

    class Config:
        from_attributes = True

class SingleUserSchema(BaseModel):
    id: str = Field(alias='_id')
    userName: str
    searchTag: str
    email: str
    avatar: str
    longitude: float   
    latitude: float    
    createdAt: datetime

    class Config:
        populate_by_name = True
        from_attributes = True


class GetSingleUserSchema(BaseModel):
    message: str
    user: SingleUserSchema

    class Config:
        from_attributes = True

class SuspendUserSchema(BaseModel):
    message: str

    class Config:
        from_attributes = True