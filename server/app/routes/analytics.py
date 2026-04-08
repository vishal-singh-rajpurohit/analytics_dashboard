from fastapi import APIRouter, Depends
import pandas as pd
from ..middleware.auth_middleware import is_logged_in
from ..models.db_models import Users
from ..models.db_models import Logins


analyticsRouter = APIRouter(prefix='/analytics', tags=['ANALYTICS'], dependencies=[Depends(is_logged_in)])

@analyticsRouter.get('/monthly-user')
async def root():

    loginCount = [
        {
            '$match': {}
        },
        {
            '$group': {
            '_id': {
                '$dateToString': {
                'format': "%Y-%m-%d",
                'date': "$updatedAt"
                }
            },
            'count': { '$sum': 1 }
            }
        },
        {
            '$limit': 30
        }
    ]

    loginCount = Logins.objects().aggregate(loginCount)

    print(loginCount)
    
    return {
        'message': 'hii'
    }