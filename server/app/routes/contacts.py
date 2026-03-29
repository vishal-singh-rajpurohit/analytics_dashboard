from fastapi import APIRouter, Request, Depends, HTTPException, status
from ..middleware.auth_middleware import is_logged_in
from ..models.db_models import Contacts
from ..schemas.resp_body import ContactsOverviewResponseSchema, GetSingleContactRespSchema
from ..schemas.req_body import GetItemSchema
from bson import ObjectId

contactsRouter = APIRouter(prefix='/contacts', tags=['CONTACTS'], dependencies=[Depends(is_logged_in)])

@contactsRouter.post('/', response_model=ContactsOverviewResponseSchema ,status_code=status.HTTP_200_OK)
async def root(req: Request, payload: GetItemSchema):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )

    contacts_pipeline = [
        {'$match': {}},
        {'$skip': (payload.count * payload.page) - payload.count},
        {'$limit': payload.count},
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


@contactsRouter.get('/{id}', response_model=GetSingleContactRespSchema, status_code=status.HTTP_200_OK)
async def get_contacts(id: str, req: Request):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )
    
    if not id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'Contact id Required'
            }
        )

    contact_pipeline = [
        {
            '$match': {
                '_id': ObjectId(id)
            }
        }
    ]

    results = list(Contacts.objects().aggregate(contact_pipeline))

    if not results:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'message': 'User not found'
            }
        )
    
    contact = results[0]

    contact['_id'] = str(contact['_id'])

    for i in range(0,len(contact['oneOnOne'])):
        contact['oneOnOne'][i] = str(contact['oneOnOne'][i])

    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'message': 'contact not found'
            }
        )
    
    return GetSingleContactRespSchema(
        message = 'contact found',
        contact = contact
    )

