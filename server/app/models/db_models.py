from mongoengine import  Document, StringField, EmailField, BooleanField, ListField, ReferenceField, EnumField, DateTimeField, IntField, EmbeddedDocument, EmbeddedDocumentField, NULLIFY
from enum import Enum
from datetime import datetime
from ..utils.hash import hash_password, verify_password, is_hashed

def encrypt_message():
    pass

class RoleEnum(Enum):
        SUPER_ADMIN = 'super'
        ADMIN = 'normal'

class Admin(Document):
    name = StringField(required=True, max_length=18)

    superior = ReferenceField(
        'self',
        reverse_delete_rule=NULLIFY,
    )

    email = EmailField(required=True, unique=True)

    mobile = StringField(
        required=True,
        min_length=10,
        max_length=15,
        unique=True
    )

    password = StringField(required=True)

    isSuspended = BooleanField(required=True, default=False)

    role = EnumField(
        RoleEnum,
        required=True,
        default=RoleEnum.SUPER_ADMIN
    )

    refreshToken = StringField(required=True, default="")
    
    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'admin',
        'indexes': [
            'email',
            'mobile',
            'role'
        ]
    }

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()

        if not is_hashed(self.password):
            self.password = hash_password(self.password)

        return super(Admin, self).save(*args, **kwargs)


    def genrate_refresh_token(self, *args, **kwargs):
        pass

    # def genrate_access_token(self, *args, **kwargs):
        # pass

class Users(Document):
    meta = {"strict": False}

    userName = StringField(required=True)
    searchTag = StringField(required=True, unique=True, index=True)
    socketId = StringField(required=True, default="")
    email = EmailField(required=True, unique=True, index=True)
    password = StringField(required=True)
    avatar = StringField(required=True, default="")
    online = BooleanField(required=True, default=False)
    theme = BooleanField(required=True, default=False)
    showOnline = BooleanField(required=True, default=True)
    refreshToken = StringField(required=True, default="")
    securityQuestion = StringField(required=True, default="")
    securityAnswer = StringField(required=True, default="")
    public_id_avatar = StringField(required=True, default="")
    longitude = StringField(required=True, default="")
    latitude = StringField(required=True, default="")

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super(Admin, self).save(*args, **kwargs)

class Contacts(Document):
    meta = {
        "collection": "contact",
        "strict": False 
    }


    oneOnOne = ListField(
        ReferenceField("Users"),
        default=None
    )

    createdBy = ReferenceField("Users")


    isGroup = BooleanField(required=True, default=False)
    groupAvatar = StringField()
    groupName = StringField()

    whoCanSend = StringField(
        choices=["anyone", "no_one", "only_admin"]
    )

    description = StringField()


    lastMessage = StringField(default="", required=True)


    socketId = StringField(default=None)

    public_id_avatar = StringField()

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super(Admin, self).save(*args, **kwargs)

class Feedback(Document):
    meta = {
        "collection": "feedback",
        "strict": False
    }

    userId = ReferenceField("Users", required=True)
    contactId = ReferenceField("Contact", default=None)

    message = StringField(default="No Message", required=True)
    type = StringField(required=True)

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super().save(*args, **kwargs)

class ContactMember(Document):
    meta = {
        "collection": "contactmember",
        "strict": False,
        "indexes": ["userId", "contactId", ("userId", "contactId")]
    }

    userId = ReferenceField("Users", required=True)
    contactId = ReferenceField("Contact", required=True)
    addedBy = ReferenceField("Users", default=None)

    isAdmin = BooleanField(required=True, default=True)
    isArchieved = BooleanField(required=True, default=False)
    isBlocked = BooleanField(required=True, default=False)

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super().save(*args, **kwargs)

class Attachments(Document):
    messageId = StringField(required=True)
    contactId = StringField(required=True)
    fileType = StringField(required=True)
    link = StringField(required=True)
    public_id = StringField(required=True)

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'attachment',
        'timeseries': {
            'timeField': 'createdAt',
            'metaField': 'contactId',
            'granularity': 'seconds'
        }
    }

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super(Attachments, self).save(*args, **kwargs)
    
class Call(Document):
    callerId = ReferenceField(Users, required=True)
    roomId = ReferenceField(Users, required=True)

    members = ListField(
        ReferenceField(Users),
        required=True
    )

    expectedCount = IntField(required=True)

    isAnswered = BooleanField(required=True)

    isEnded = BooleanField(required=True, default=False)

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'calls',

        'timeseries': {
            'timeField': 'createdAt',
            'metaField': 'callerId',
            'granularity': 'seconds'
        },

        'indexes': [
            'callerId',
            'roomId',
            'members'
        ]
    }

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super(Call, self).save(*args, **kwargs)

class GeoSchema(EmbeddedDocument):
    longitude = StringField(required=True)
    latitude = StringField(required=True)

class ReferTo(EmbeddedDocument):
    msgId = ReferenceField('Message')  # self reference
    targetUserTag = StringField()

class Messages(Document):
    message = StringField()

    contactId = ReferenceField(Contacts, required=True)
    userId = ReferenceField(Users, required=True)

    hasAttechment = BooleanField(required=True, default=False)
    pending = BooleanField(required=True, default=False)

    attechmentLink = StringField()
    attechmentType = StringField()

    attechmentId = ReferenceField(Attachments)

    isCall = BooleanField(required=True, default=False)
    callType = StringField(default="VIDEO")

    callId = ReferenceField(Call)

    geoLoc = EmbeddedDocumentField(GeoSchema, required=True)

    refferTo = EmbeddedDocumentField(ReferTo)

    isDeleted = BooleanField(required=True, default=False)

    readBy = ListField(ReferenceField(Users), default=list, required=True)

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'message',

        'timeseries': {
            'timeField': 'createdAt',
            'metaField': 'contactId',
            'granularity': 'seconds'
        },

        'indexes': [
            'contactId',
            'userId',
            'attechmentId',
            'callId',
            'readBy'
        ]
    }

    def save(self, *args, **kwargs):
        if self.message:
            self.message = encrypt_message(self.message)

        self.updatedAt = datetime.utcnow()
        return super(Messages, self).save(*args, **kwargs)

class Reaction(Document):
    reactCode = StringField(required=True)

    userId = ReferenceField(Users, required=True)
    messageId = ReferenceField(Messages, required=True)

    # timestamps
    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'react',

        'timeseries': {
            'timeField': 'createdAt',
            'metaField': 'messageId',
            'granularity': 'seconds'
        },

        'indexes': [
            'userId',
            'messageId',
            ('userId', 'messageId') 
        ]
    }

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super(Reaction, self).save(*args, **kwargs)

class Seen(Document):
    messageId = ReferenceField(Messages, required=True)
    userId = ReferenceField(Users, required=True)
    contactId = ReferenceField(Contacts, required=True)

    seen = BooleanField(required=True, default=False)

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'seen',
        'timeseries': {
            'timeField': 'createdAt',
            'metaField': 'contactId',
            'granularity': 'seconds'
        },

        'indexes': [
            'messageId',
            'userId',
            'contactId',
            ('messageId', 'userId')  
        ]
    }

    def save(self, *args, **kwargs):
        self.updatedAt = datetime.utcnow()
        return super(Seen, self).save(*args, **kwargs)
