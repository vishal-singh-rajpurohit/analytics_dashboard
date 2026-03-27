from fastapi import APIRouter

authRouter = APIRouter(prefix='/auth', tags=['AUTH'])

@authRouter.get('/')
async def root():
    pass

@authRouter.post('/create_role')
async def create_admin():
    pass

@authRouter.post('/login')
async def login():
    pass

@authRouter.post('/suspend')
async def suspend():
    pass

