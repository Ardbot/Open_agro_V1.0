""" Карта урожайности """
from datetime import timedelta, datetime
import requests

LOGIN = 'login'
PASSWORD = 'password'
PATCH = 'D:\DataBase\Сartography\Yield\\'   # Путь куда сохраняем

# Укажите id
# machineId = '112233445'
type = 'type=ERTRAG'
# from_date = 'from=2022-11-08T06%3A00%3A00%2B09%3A00'
# to_date = 'to=2022-11-09T06%3A00%3A00%2B09%3A00'
maxPercentOfPoints = 'maxPercentOfPoints=-1'
maxNoOfPoints = 'maxNoOfPoints=4000'

# Необязательно
# zoomLevel = 'zoomLevel=16'
# bottom = 'bottom=127.9'
# top = 'top=127.9'
# left = 'left=50.4'
# right = 'right=50.4'

# Время? Что дает? Время авторизации?
time = '_=1667871853552'


def main():
    """ Основной блок """
    # Получаем список зерноуборочной техники
    cars = car_list()
    requests_days(cars)


def car_list():
    url = 'https://rest.claas-telematics.com/TSRest/v001/prod/machines/filterentries/'
    response = requests.get(url, auth=(LOGIN, PASSWORD))
    if response.status_code == 200:
        # Сохраняем список файлов
        name_files = f'{PATCH}Cars.json'
        with open(name_files, 'w', encoding='utf8') as f:
            f.write(response.text)

        # Парсим id машин
        data = response.json()
        cars = []
        for car in data:
            # Eсли комбаин и активирован
            if car.get('basic') == False and car.get('productFamily') == 'Maehdrescher':  # car.get('basic') == False and - НЕ базовой комплектации!
                cars.append(car.get('machineId'))
                # print(car.get('machineId'))
            else:
                pass
        print('Получено комбайнов:', len(cars))
        return cars
    else:
        print('Error:', response.status_code)
        return response.status_code


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
