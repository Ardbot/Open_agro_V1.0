""" Микросервис "Карта" """
from Microservices.FastApi import *

# Считываем пароль с хранилища сервера
apiKey = keyring.get_password("agrosignal", "apiKey")

""" Каталог с картой """
app.mount("/map", StaticFiles(directory="Microservices/map/client", html=True))
# Имитация базы данных
app.mount("/db", StaticFiles(directory="Microservices/map/client/layers"))

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
    return FileResponse("Microservices/map/client/NFC.html")


# Взаимодействие с Агросигнал

@app.get("/api/map/geo")
async def request_work(unitId="121051"):
    """ Запрос работ агросигнала"""
    url = f"https://gis.agrosignal.com/unitTrack?unitId={unitId}&from=2023-01-17T15:00:00.000Z&to=2023-01-18T14:59:00.000Z&apiKey="+ apiKey
    # print(url)
    r = requests.post(url)

    data = r.json()[-1][0][-1]
    # последний элемент

    mes = {
        "lat": data[0],
        "lng": data[1],
        "time": data[2],
        "curs":data[3],
        "speed":data[4],
        "add": data[5]
    }
    return mes




@app.get("/api/map/car_list")
async def car_list(): 
    # Список техники
    url = "https://gis.agrosignal.com/units?apiKey=" + apiKey
    data = requests.get(url)
    data = data.json()

    # with open("car.json", "r", encoding='utf-8') as f:
    # data = json.load(f)
    # return data.json()

    car_id = data.get("data")
    car = []
    for id in car_id:
        info = {id.get("id") : id.get("number")}
        car.append(info)
        # car.append(id.get("id"))

    print(len(car))
    return car
            




if __name__ == "__main__":
    uvicorn.run("Map:app", reload=True, host='0.0.0.0', port=8000, log_level="info")
