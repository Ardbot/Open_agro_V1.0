""" Микросервис "Карта" """
from Microservices.FastApi import *

map_router = APIRouter( 
prefix='/map', 
tags = ['map'] 
)

@map_router.get("/home")
async def map_home_point():
    """ Запрос в БД. Стартовая точка организации"""
    return [50.0, 128]

@map_router.get("/layers")
async def return_layers():
    """ Возвращает список слоев """
    return {"layers": ["fields", "roads", "alias"]}

@map_router.get("/fields")
async def return_fields():
    """ Вернуть файл с полями"""
    return FileResponse("Microservices/Map/Client/layers/field.js")
            

if __name__ == "__main__":
    uvicorn.run("Map:app", reload=True, host='0.0.0.0', port=8000, log_level="info")
