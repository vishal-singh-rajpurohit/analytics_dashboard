from fastapi import APIRouter, Request, Depends, HTTPException, status
from ..middleware.auth_middleware import is_logged_in
from ..models.db_models import Contacts
from ..schemas.resp_body import ContactsOverviewResponseSchema

contactsRouter = APIRouter(prefix='/contacts', tags=['CONTACTS'], dependencies=[Depends(is_logged_in)])


@contactsRouter.get('/', response_model=ContactsOverviewResponseSchema ,status_code=status.HTTP_200_OK)
async def root(req: Request,):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )

    
    contacts_pipeline = [
        {'$match': {}},
        {'$limit': 3},
        {
            '$lookup': {
                'from': "users",
                'localField': "oneOnOne",
                'foreignField': "_id",
                'as': "members"
            }
        },
        {
            '$unwind': {
                'path': "$members",
                'preserveNullAndEmptyArrays': True
            }
        },
        {
            '$addFields': {
                'memberName': "$members.searchTag"
            }
        },
        {
            '$addFields': {
                'contactType': {
                    '$cond': ["$isGroup", "Group", "P2P"]
                }
            }
        },
        {
            '$group': {
                '_id': "$_id",
                'createdAt': {'$first': "$createdAt"},
                'contactType': {'$first': "$contactType"},
                'members': {'$push': "$memberName"}
            }
        },
        {
            '$project': {
                'oneOnOne': 0,
                'lastMessage': 0,
                'updatedAt': 0
            }
        }
    ]

    contacts = list(Contacts.objects().aggregate(contacts_pipeline))
    
    for item in contacts:
        item['_id'] = str(item['_id'])

    if not contacts:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'message': 'Contacts not found'
            }
        )

    return ContactsOverviewResponseSchema(
        message= 'Contacts Found',
        contacts= contacts
    )


@contactsRouter.post('/')
async def get_contacts():
    pass