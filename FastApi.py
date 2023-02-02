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
# uvicorn FastApi:app --reload --host=0.0.0.0

from fastapi import FastAPI, Request
from fastapi import APIRouter 
from starlette.staticfiles import StaticFiles
# FileResponse

from map.server.Map import map_router
from RFID.server.RFID_server import map_nfc
from agrosignal.agrosignal import as_router
from map.server.users import user_router
app = FastAPI()


# Главная страница
@app.get("/", tags=["Root"])
def root():
    msg = f"API: /docs; (c)Ardbot"
    return msg

""" Каталоги приложений """

# Папка с инструментами/ плагинами 
app.mount("/tools", StaticFiles(directory="tools", html=True)) 

# Пользователи
app.include_router(user_router)

# Машины


# Карта
app.include_router(map_router)
app.mount("/map", StaticFiles(directory="map\client", html=True)) 

# RFID
app.include_router(map_nfc)
app.mount("/rfid", StaticFiles(directory="RFID\client", html=True))

# Агросигнал
app.include_router(as_router)
