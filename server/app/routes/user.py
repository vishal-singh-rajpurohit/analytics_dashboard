from fastapi import APIRouter, Request, HTTPException, status, Depends
from ..middleware.auth_middleware import is_logged_in
from ..schemas.req_body import GetItemSchema
from ..schemas.resp_body import UserOverviewResopnseSchema
from ..models.db_models import Users

userRouter = APIRouter(prefix='/users', tags=['USER'])

@userRouter.get('/', response_model=UserOverviewResopnseSchema, status_code=status.HTTP_200_OK, dependencies=[Depends(is_logged_in)])
def root(req: Request):
    
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
        {
            '$limit': 3
        },
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

@userRouter.post('/')
def post_get_user(payload: GetItemSchema):
    pass

@userRouter.post('/suspend')
def suspend_user():
    pass

@userRouter.post('/notify')
def notify_user():
    pass
