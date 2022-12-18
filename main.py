""" Точка входа
uvicorn main:app --reload
"""
from typing import Union

from fastapi import FastAPI
from fastapi.responses import FileResponse
from starlette.staticfiles import StaticFiles

app = FastAPI()
""" Каталог с картой """
app.mount("/map", StaticFiles(directory="Map_dev", html=True))


@app.get("/")
def read_root():
    return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

@app.post("/api/map/home")
async def map_home_point():
    """ Запрос в БД. Стартовая точка пользователя"""
    return {"message": {'latlong': [50.253313, 127.8073497], 'zoom': 13}}


# @app.put("/api/map/home/{user_id}")
# async def map_home_point(user_id: int):
#     """ Обновление стартовой точки """
#     # return {"Hello": "World"}
#     return {user_id: [50.253313, 127.8073497]}

def return_error(error_code, description=None):
    """ Возвращает код ошибки """
    msg = {"ok": "false", "error_code": error_code, "description": description}
    return msg
