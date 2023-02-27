# Пользователи системы

from FastApi import *
import random

user_router = APIRouter( 
prefix='/api/users', 
tags = ['users'] 
)

@user_router.get("/id")
async def userId():
    """ Запрос в БД. Стартовая точка организации"""
    # requests.post("/id")
    r = random.randint(1,40)
    return {"rnd":r}