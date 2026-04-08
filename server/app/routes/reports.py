from fastapi import APIRouter, Request, status, Depends
from ..middleware.auth_middleware import is_logged_in
from ..schemas.resp_body import ReportOverviewResponseSchema, GetSingleReportRespSchema, SuspendUserSchema

from ..schemas.req_body import GetItemSchema, IdSchema
from ..controllers.reports_controller import get_reports, get_report, reject

# reportsRouter = APIRouter(prefix='/reports', tags=['REPORTS'], dependencies=[Depends(is_logged_in)])
reportsRouter = APIRouter(prefix='/reports', tags=['REPORTS'])

"""
    add middleware back in production
"""

@reportsRouter.post('/', response_model=ReportOverviewResponseSchema, status_code=status.HTTP_200_OK)
async def root(req: Request, payload: GetItemSchema):
    return await get_reports(req, payload)

@reportsRouter.get('/{id}', response_model=GetSingleReportRespSchema, status_code=status.HTTP_200_OK)
async def root(id: str, req: Request):
    return await get_report(id, req)

@reportsRouter.post('/reject', response_model=SuspendUserSchema, status_code=status.HTTP_200_OK)
async def root(payload: IdSchema, req: Request):
    return await reject(payload, req)

@reportsRouter.post('/resolve')
async def resp():
    pass

