from fastapi import APIRouter

reportsRouter = APIRouter(prefix='/reports', tags=['AUTH'])


@reportsRouter.get('/')
async def root():
    pass

@reportsRouter.post('/')
async def get_reports():
    pass

@reportsRouter.post('/reject')
async def reject():
    pass

@reportsRouter.post('/response')
async def resp():
    pass

