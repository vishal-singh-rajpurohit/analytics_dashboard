from fastapi import APIRouter, Request, status
from ..schemas.resp_body import ContactsOverviewResponseSchema, GetSingleContactRespSchema
from ..schemas.req_body import GetItemSchema
from ..controllers.contacts_controller import get_contacts, get_contact

contactsRouter = APIRouter(prefix='/contacts', tags=['CONTACTS'])
# contactsRouter = APIRouter(prefix='/contacts', tags=['CONTACTS'], dependencies=[Depends(is_logged_in)]) 

@contactsRouter.post('/', response_model=ContactsOverviewResponseSchema ,status_code=status.HTTP_200_OK)
async def root(req: Request, payload: GetItemSchema):
    return await get_contacts(req, payload)


@contactsRouter.get('/{id}', response_model=GetSingleContactRespSchema, status_code=status.HTTP_200_OK)
async def root(id: str, req: Request):
    await get_contact(id, req)