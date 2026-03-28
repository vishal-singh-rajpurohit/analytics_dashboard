from pydantic import BaseModel


class RegisterSuperAdminRespSchema(BaseModel):
    id: str
    message: str
    name: str
    email: str
    mobile: str
    role: str

    class Config:
        from_attributes = True