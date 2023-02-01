# Пользователи системы

from FastApi import *

user_router = APIRouter( 
prefix='/users', 
tags = ['users'] 
)

@user_router.get("/id")
async def userId():
    """ Запрос в БД. Стартовая точка организации"""
    return "dawdda"
