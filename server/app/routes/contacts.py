from fastapi import APIRouter

contactsRouter = APIRouter(prefix='/contacts', tags=['CONTACTS'])

@contactsRouter.get('/')
async def root():
    pass

@contactsRouter.post('/')
async def get_contacts():
    pass