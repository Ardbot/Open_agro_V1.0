""" Парсинг урожайности и упрощение файла """
import json
from pathlib import Path

# Settings
import geojson

from backend.tools.generate_geojson import pars_point

PATH_TO_FILE = 'D:\DataBase\Сartography\Yield\\'  # Путь куда сохраняем
SAVE_PATCH = 'D:\DataBase\Сartography\geojson\\'  # Путь куда сохраняем


def main():
    """ Основная функция """
    # Search for files
    paths = file_list(path=PATH_TO_FILE, format_file='json')

    # Обработка файла
    for file in paths:
        print(file.name)
        # Извлекаем содержимое файла
        geojson_data = monitoring(file)
        # print(geojson_data)

        # Сохраняем файл с названием исходного файла
        with open(f'{SAVE_PATCH}{file.name.split(".")[0]}.json', 'w', encoding='utf8') as f:
            f.write(json.dumps(geojson_data))

        # Упрощаем файл. Переводим в мультиточку
        # simplification(geojson_data)

        return


def file_list(path, format_file='json'):
    """ List files in a folder """
    try:
        paths = sorted(Path(path).glob(f'**/*.{format_file}'))  # Список файлов в папке
        print('Найдено файлов:', len(paths))
        return paths
    except Exception as e:
        print('Error:', e)


def monitoring(file):
    """ Extract map from json file """
    try:
        with open(file, encoding='utf8') as f:
            data = json.load(f)
        map_json = data.get('monitoring')[0].get('map')
        # print(map_json)
        features = map_json.get('features')
        print(features)
        # name = map_json.get('name')/
        # name = map_json[0]
        # crs = map_json.get('crs'))
        # crs = map_json[1]

        # print(name, crs)

        return map_json
    except Exception as e:
        print('Error:', e)

        # with open(f'{SAVE_PATCH}{file}.geojson', 'w', encoding='utf8') as f:
        # pass
        # f.write(json.dumps(map))


def simplification(geojson_data):
    """ Simplification json """
    try:
        name = '123456'
        crs = '"type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84"'
        new_geojson = {}
        new_geojson.update({"type": "FeatureCollection"})
        new_geojson.update({"name": name})
        new_geojson.update({"crs": crs})
        new_geojson.update('features')
        print(new_geojson)
        # "type": "FeatureCollection"

        pars_point(geojson_data)

    # return
    except Exception as e:
        print('Error:', e)


if __name__ == '__main__':
    main()

    # simplification(1)
