# Взаимодействие с Агросигнал

from Microservices.FastApi import *

as_router = APIRouter( 
prefix='/as', 
tags = ['Agrosignal'] 
)

@as_router.get("/track")
async def request_track(unitId="121051", start="2023-01-17T15:00:00.000Z", end="2023-01-18T14:59:00.000Z"):
    """ Запрос работ агросигнала"""
    url = f"https://gis.agrosignal.com/unitTrack?unitId={unitId}&{start}=2023-01-17T15:00:00.000Z&{end}=2023-01-18T14:59:00.000Z&apiKey="+ apiKey
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


@as_router.get("/car_list")
async def car_list(): 
    try:
        # Список техники
        url = "https://gis.agrosignal.com/units?apiKey=" + apiKey
        print(apiKey)
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
    except: 
        print("err")