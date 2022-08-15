"""Конвертация в полигон"""
import glob
import time
from pathlib import Path

def convert_to_poligon(name_field):
    """ Конвертируем координаты в shp """
    path = Path(name_field)
    if path.is_file():
        f = open(name_field, 'r')
        buf = f.read()
        buf = buf[15:-6]  # Режем лишнее

        poligon = '{"type": "Feature","properties": {"Name":"' + name_field[:-4] + '"},"geometry": {"type": "Polygon","coordinates":' + buf + '}}'

        return poligon
        # return buf

    else:
        print(f"Файл {name_field} не найден!")
        time.sleep(2)


if __name__ == '__main__':
    # name_field = input('Введите название файла\n')
    file_list = glob.glob('*.txt')
    print(file_list)
    for file in file_list:
        data = convert_to_poligon(file)
        if data is not None:
            f = open(f'{file[:-4]}.shp', 'w')
            f.write(data)
            f.close()