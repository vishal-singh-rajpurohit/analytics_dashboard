from fastapi import Request, HTTPException, status
from ..schemas.resp_body import ReportOverviewResponseSchema, GetSingleReportRespSchema, SuspendUserSchema
from ..models.db_models import Feedback
from ..schemas.req_body import GetItemSchema, IdSchema
from bson import ObjectId


async def get_reports(req: Request, payload: GetItemSchema):
    # if not req.state.is_authenticted:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail={
    #             'message': 'Unautharise Access'
    #         }
    #     )


    print((payload.count * payload.page) - payload.count)

    print(payload.count)
    
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

    print(reports)
    
    for item in reports:
        item['_id'] = str(item['_id'])

    return ReportOverviewResponseSchema(
        message= 'Reports Found',
        reports= reports
    )

async def get_report(id: str, req: Request):
    # if not req.state.is_authenticted:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail={
    #             'message': 'Unautharise Access'
    #         }
    #     )

    
    report_pipeline = [
        {
            '$match': {
            '_id': ObjectId(id)
            }
        },
        {
            '$lookup': {
                'from': "users",
                'localField': "userId",
                'foreignField': "_id",
                'as': "reportedBy"
            }
        },
        {
            '$unwind': {
                'path': "$reportedBy"
            }
        },
        {
            '$project': {
                'userId': 1,
                'contactId': 1,
                'message': 1,
                'type': 1,
                'createdAt': 1,
                "reportedBy._id": 1,
                "reportedBy.searchTag": 1
            }
        }
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
    report['reportedBy']['_id'] = str(report['reportedBy']['_id']) 

    return GetSingleReportRespSchema(
        message="Full Report found",
        report=report
    )

async def reject(payload: IdSchema, req: Request):
    # if not req.state.is_authenticted:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail={
    #             'message': 'Unautharise Access'
    #         }
    #     )
    
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

async def respolve():
    pass

