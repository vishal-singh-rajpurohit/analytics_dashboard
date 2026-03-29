from fastapi import APIRouter, Request, HTTPException, status, Depends
from ..middleware.auth_middleware import is_logged_in
from ..schemas.resp_body import ReportOverviewResponseSchema
from ..models.db_models import Feedback

reportsRouter = APIRouter(prefix='/reports', tags=['REPORTS'], dependencies=[Depends(is_logged_in)])

@reportsRouter.get('/', response_model=ReportOverviewResponseSchema, status_code=status.HTTP_200_OK)
async def root(req: Request):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )
    
    reports_pipeline = [
        {'$match': {}},
        {'$limit': 2},
        {'$addFields': {'reportType': '$type'}},
        {
            '$project': {
                'message': 1,
                'reportType': 1,
                'createdAt': 1
            }
        }
    ]

    reports = list(Feedback.objects().aggregate(reports_pipeline))
    
    for item in reports:
        item['_id'] = str(item['_id'])

    if not reports:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'message': 'Reports not found'
            }
        )

    return ReportOverviewResponseSchema(
        message= 'Reports Found',
        reports= reports
    )

@reportsRouter.post('/')
async def get_reports():
    pass

@reportsRouter.post('/reject')
async def reject():
    pass

@reportsRouter.post('/response')
async def resp():
    pass

