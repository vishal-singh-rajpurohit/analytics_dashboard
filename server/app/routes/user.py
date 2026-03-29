from fastapi import APIRouter, Request, HTTPException, status, Depends
from bson import ObjectId

from ..middleware.auth_middleware import is_logged_in
from ..schemas.req_body import GetItemSchema
from ..schemas.resp_body import UserOverviewResopnseSchema, GetSingleUserSchema
from ..models.db_models import Users
from ..schemas.req_body import GetItemSchema

userRouter = APIRouter(prefix='/users', tags=['USER'], dependencies=[Depends(is_logged_in)])

@userRouter.post('/', response_model=UserOverviewResopnseSchema, status_code=status.HTTP_200_OK)
def root(req: Request, payload: GetItemSchema):
    
    if not req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharise Access'
            }
        )

    user_pipeline = [
        {
            '$match': {}
        },
        {'$skip': (payload.count * payload.page) - payload.count},
        {'$limit': payload.count},
        {
            '$project': {
            'searchTag': 1,
            'online': 1
            }
        }
    ]

    users = list(Users.objects().aggregate(user_pipeline))
    
    for item in users:
        item['_id'] = str(item['_id'])

    if not users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'message': 'Contacts not found'
            }
        )

    return UserOverviewResopnseSchema(
        message= 'Contacts Found',
        users= users
    )

@userRouter.get('/{id}', response_model=GetSingleUserSchema, status_code=status.HTTP_200_OK)
def post_get_user(id: str, req: Request):
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
                'message': 'User id Required'
            }
        )

    user_pipeline = [
    {
        '$match': {'_id': ObjectId(id)}
    },
    {
        '$project': {
            'userName': 1,
            'searchTag': 1, 
            'email': 1,
            'avatar': 1,
            'longitude': 1,
            'latitude': 1,
            'createdAt': 1
        }
    }
]

    results = list(Users.objects().aggregate(user_pipeline))

    if not results:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'message': 'User not found'
            }
        )
    
    user = results[0]

    user['_id'] = str(user['_id'])

    return GetSingleUserSchema(
        message= 'User Found',
        user= user
    )

@userRouter.post('/suspend')
def suspend_user():
    pass

@userRouter.post('/notify')
def notify_user():
    pass
