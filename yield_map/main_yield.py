""" Карта урожайности c системы """
import os
from datetime import datetime, timedelta
import requests as requests



LOGIN = input("Введите логин Claas: ")
PASSWORD = input("Введите пароль Claas: ")
PATCH = 'C:\Yield\\'   # Путь куда сохраняем. ПОЛНЫЙ

# machineId = '112233445'
type = 'type=ERTRAG'
# from_date = 'from=2022-11-08T06%3A00%3A00%2B09%3A00'
# to_date = 'to=2022-11-09T06%3A00%3A00%2B09%3A00'
maxPercentOfPoints = 'maxPercentOfPoints=-1'
maxNoOfPoints = 'maxNoOfPoints=4000'

# Время? Что дает? Время авторизации?
time = '_=1667871853552'

def main():
    """ Точка входа """

    get_day()

    # Получаем список техники с активированными датчиками урожайности
    cars = car_list()
    requests_days(cars)
    input("Завершено. Нажмите Enter. ")



# def identification():
#     """ Идентефикация пользователя. Добавить токен"""
#     LOGIN = input("Введите логин Claas:")
#     PASSWORD = input("Введите пароль Claas:")

def car_list():
    """ Получаем список техники """
    try:
        url = 'https://rest.claas-telematics.com/TSRest/v001/prod/machines/filterentries/'
        response = requests.get(url, auth=(LOGIN, PASSWORD))
        if response.status_code == 200:

            # Сохраняем файл с техникой
            with open(f'{PATCH}Cars.json', 'w', encoding='utf8') as f:
                f.write(response.text)

            # Парсим id машин
            data = response.json()
            cars = []
            for car in data:
                # Eсли это комбайн и не базовый пакет услуг.
                if car.get('productFamily') == 'Maehdrescher' and car.get('basic') == False:  # car.get('basic') == False - НЕ базовой комплектации!
                    cars.append(car.get('machineId'))
                    print('С подпиской:', car.get('name'), car.get('machineId'))
                else:
                    print('Базовый:', car.get('name'), car.get('machineId'))
            print(f'Получено комбайнов c подпиской/Всего: {len(cars)}/{len(data)}')
            return cars
        else:
            print('Error:', response.status_code)
            return response.status_code
    except Exception as e:
        print('Error:', e)

def get_day():
    # Запросить список дней
    today = datetime.now()
    iso_date = today.isoformat()
    print(iso_date)

    dt = datetime(2022, 8, 1, 0, 0, 0, 685496)
    fr_date = dt.isoformat()
    print(fr_date)

    # url = f'https://rest.claas-telematics.com/TSRest/prod/v002/machine/harvestdays/monthsback/2/?date={fr_date}&_={iso_date}'
    url = 'https://rest.claas-telematics.com/TSRest/prod/v002/machine/harvestdays/monthsback/2/?date=2019-07-31T00%3A00%3A00%2B09%3A00&_=1675865360107'
    response = requests.get(url, auth=(LOGIN, PASSWORD))
    if response.status_code == 200:
        print(response.json)


def requests_days(cars, date='01.08.2022', days=1):
    """ Запрос данных по дням """
    try:
        date = input('Введите день уборки (в формате: 01.08.2022):')
        days = int(input('Введите кол-во дней:'))
        format = '%d.%m.%Y'
        from_date = datetime.strptime(date, format)
        from_date = from_date.date()
        for i in range(days):
            print(from_date)
            for car in cars:
                # Выполняем запрос по технике
                productivity(from_date, car)
            print()
            from_date = from_date + timedelta(days=1)
    except Exception as e:
        print('Error:', e)


def productivity(from_date, car):
    """Получение пакетов с урожайностью"""
    to_date = from_date + timedelta(days=1)
    url = f'http://rest.claas-telematics.com/TSRest/prod/v002/machines/monitoringData/machineId/{car}?{type}&from={from_date}T06%3A00%3A00%2B09%3A00&to={to_date}T06%3A00%3A00%2B09%3A00&{maxPercentOfPoints}&{time}"'
    response = requests.get(url, auth=(LOGIN, PASSWORD))
    if response.status_code == 200:
        #  Пропускаем дни без уборки.
        if response.text == '{"monitoring":[],"legend":[],"percent":100}':
            print(from_date, car, 'Уборки не было')
        else:
            # Записываем файл
            name_files = f'{PATCH}{car}_{from_date}.json'
            with open(name_files, 'w', encoding='utf8') as f:
                print(from_date, car, 'Уборочная')
                f.write(response.text)
    else:
        print('Error', response.status_code)

if __name__ == '__main__':
    main()




