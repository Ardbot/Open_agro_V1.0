# Создание сервера для микросервисов
import json
import requests
import uvicorn

# Храним безопасно пароли
import keyring

# Записать пароль в хранилище ОС (Удалить пароль после выполнения!)
# keyring.set_password("agrosignal", "apiKey", "xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx")

# Считываем пароль с хранилища сервера
apiKey = keyring.get_password("agrosignal", "apiKey")

# Старт uvicorn сервера
# uvicorn Microservices.map.server.Map:app --reload --host=0.0.0.0
# uvicorn Microservices.FastApi:app --reload --host=0.0.0.0

from fastapi import FastAPI
from fastapi import APIRouter
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

# from fastapi import FastAPI, Request
# from fastapi.responses import HTMLResponse
# from fastapi.templating import Jinja2Templates

from Microservices.map.server.Map import map_router
from Microservices.RFID.server.RFID_server import map_nfc
from Microservices.agrosignal.agrosignal import as_router
from Microservices.map.server.users import user_router
app = FastAPI()


# app.mount("/static", StaticFiles(directory="static"), name="static")


# templates = Jinja2Templates(directory="Microservices\map\client")


# @app.get("/items/{id}", response_class=HTMLResponse)
# async def read_item(request: Request, id: str):
#     return templates.TemplateResponse("item.html", {"request": request, "id": id})


# Главная страница
@app.get("/", tags=["Root"])
def root():
    msg = f"API: /docs; (c)Ardbot"
    return msg


""" Каталоги приложений """

# Папка с инструментами/ плагинами 
# app.mount("/tools", StaticFiles(directory="Microservices\\tools", html=True))

# Пользователи
app.include_router(user_router)

# Машины


# Карта
app.include_router(map_router)
app.mount("/map", StaticFiles(directory="Microservices\map\client", html=True))

# RFID
app.include_router(map_nfc)
# app.mount("/nfc", StaticFiles(directory="Microservices\RFID\client", html=True))

# Агросигнал
app.include_router(as_router)




app.mount("/tools", StaticFiles(directory="Microservices\\tools", html=True))
