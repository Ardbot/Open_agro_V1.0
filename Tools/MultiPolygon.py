""" Тест """
import glob
from Tools.Polygon import convert_to_poligon

#  НЕЗАВЕРШЕН

def add_to_multiPolygon():
    """ Комплектуем мультиполигон из txt файлов """
    file_list = glob.glob('*.txt')
    multiPolygon = []
    print(file_list)
    i = 0
    for file in file_list:
        data = convert_to_poligon(file)
        i += 1
        print(f"{i} {file}")
        # print(file)
        # print(data)
        # data = i
        multiPolygon.append(data + ',')
    # print(multiPolygon)



    f = open(f'mult.shp', 'w')
    f.write('{"type": "FeatureCollection","features": [')
    for line in multiPolygon:
        f.write(line)
    f.write(']}')
    f.close()


    # print(multiPolygon)

    # processing_list = '{"type": "FeatureCollection","name": "disk","crs": {"type": "name","properties": {"name": ' \
    # '"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features": [' + multiPolygon + ']} '


if __name__ == '__main__':
    add_to_multiPolygon()

# "VI-16.txt"
