from fastapi import APIRouter, Request, HTTPException, status, Depends
from ..middleware.auth_middleware import is_logged_in
from ..schemas.resp_body import ReportOverviewResponseSchema, GetSingleReportRespSchema, SuspendUserSchema
from ..models.db_models import Feedback
from ..schemas.req_body import GetItemSchema, IdSchema
from bson import ObjectId


reportsRouter = APIRouter(prefix='/reports', tags=['REPORTS'], dependencies=[Depends(is_logged_in)])

@reportsRouter.post('/', response_model=ReportOverviewResponseSchema, status_code=status.HTTP_200_OK)
async def root(req: Request, payload: GetItemSchema):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )
    
    reports_pipeline = [
        {'$match': {}},
        {'$skip': (payload.count * payload.page) - payload.count},
        {'$limit': payload.count},
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

@reportsRouter.get('/{id}', response_model=GetSingleReportRespSchema, status_code=status.HTTP_200_OK)
async def get_report(id: str, req: Request):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )
    
    report_pipeline = [
        {'$match': {
            '_id': ObjectId(id)
        }}
    ]

    report = list(Feedback.objects().aggregate(report_pipeline))[0]

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'message': 'Report not found '
            }
        )

    report['_id'] = str(report['_id'])
    report['userId'] = str(report['userId'])
    report['contactId'] = str(report['contactId'])

    return GetSingleReportRespSchema(
        message="Full Report found",
        report=report
    )

@reportsRouter.post('/reject', response_model=SuspendUserSchema, status_code=status.HTTP_200_OK)
async def reject(payload: IdSchema, req: Request):
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )
    
    if not payload.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'User id Required'
            }
        )
    
    report = Feedback.objects(id=payload.id).update_one(set__status="SPAM")

    if not report:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'report not rejected'
            }
        )

    return SuspendUserSchema(message="Report is Rejected")

@reportsRouter.post('/resolve')
async def resp():
    pass

