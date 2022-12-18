""" Микросервис "Карта" """
import json

import uvicorn

# Старт uvicorn Microservices.Map.Server.Map:app --reload

from fastapi import FastAPI
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

app = FastAPI()

""" Каталог с картой """
app.mount("/map", StaticFiles(directory="Microservices/Map/Client", html=True))
# Имитация базы данных
app.mount("/db", StaticFiles(directory="Microservices/Map/Client/layers"))

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/map/{user_id}/home")
async def map_home_point(user_id: int):
    """ Запрос в БД. Стартовая точка пользователя"""
    pass
    return {"message": {'latlong': [50.253313, 127.8073497], 'zoom': 13}}

@app.get("/api/map/{user_id}/layers")
async def return_files():
    """ Возвращает список слоев """
    return {"layers": ["fields", "roads", "alias"]}

@app.get("/api/map/{user_id}/fields")
async def return_files():
    """ Вернуть файл с полями"""
    return FileResponse("Microservices/Map/Client/layers/field.js")

if __name__ == "__main__":
    uvicorn.run("Map:app", reload=True, port=5000, log_level="info")
