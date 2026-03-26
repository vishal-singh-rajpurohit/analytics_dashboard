from mongoengine import  Document, StringField, EmailField, ReferenceField, EnumField, DateTimeField
from enum import Enum
from datetime import datetime

class RoleEnum(Enum):
        SUPER_ADMIN = 'super'
        ADMIN = 'normal'

class Admin(Document):
    name = StringField(required=True, max_length=18)
    superior = ReferenceField('self', reverse_delete_rule='NULLIFY')
    email = EmailField(required=True)
    mobile = StringField(required=True, min_length=12, max_length=12)
    password = StringField(required=True)
    role = EnumField(RoleEnum, required=True, default=RoleEnum.SUPER_ADMIN)
    access_token = StringField(required=True, default="")
    created_at = DateTimeField(required=True, default=datetime.utcnow)
    updated_at = DateTimeField(required=True, default=datetime.utcnow)

class User(Document):
      pass


class FeedBack(Document):
      pass

class Contacts(Document):
      pass

class ContactMembers(Document):
      pass

