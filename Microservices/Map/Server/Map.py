""" Микросервис "Карта" """
import json

import uvicorn

# Старт uvicorn Microservices.Map.Server.Map:app --reload --host=0.0.0.0

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

@app.get("/api/map/home")
async def map_home_point(org_id: int):
    """ Запрос в БД. Стартовая точка организации"""
    if org_id == 1:
        return {"message": {'latlong': [50.0, 128], 'zoom': 11}}
    elif org_id == 2:
        return {"message": {'latlong': [51, 128], 'zoom': 12}}

@app.get("/api/map/{org_id}/layers")
async def return_files(org_id: int):
    """ Возвращает список слоев """
    return {"layers": ["fields", "roads", "alias"]}

@app.get("/api/map/{org_id}/fields")
async def return_files():
    """ Вернуть файл с полями"""
    return FileResponse("Microservices/Map/Client/layers/field.js")

@app.get("/api/NFC")
async def NFC():
    """ NFC метки"""
    return FileResponse("Microservices/Map/Client/NFC.html")

if __name__ == "__main__":
    uvicorn.run("Map:app", reload=True, host='0.0.0.0', port=8000, log_level="info")
