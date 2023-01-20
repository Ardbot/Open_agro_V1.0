# Создание сервера для микросервисов
import json
import requests
import uvicorn
# Старт uvicorn сервера
# uvicorn Microservices.map.server.Map:app --reload --host=0.0.0.0

from fastapi import FastAPI
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

app = FastAPI()


# Храним безопасно пароли
import keyring

# Записать пароль в хранилище ОС (Удалить пароль после выполнения!)
# keyring.set_password("agrosignal", "apiKey", "xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx")

# Считываем пароль с хранилища сервера
apiKey = keyring.get_password("agrosignal", "apiKey")


