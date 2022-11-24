""" Генерация geojson """
import json

name = '123456'
crs = {"type": "name", "properties": {"name": "EPSG:4326"}}
point = {"type": "Feature", "properties": {"value": 1.0},
         "geometry": {"type": "MultiPoint", "coordinates": [[128.7013983, 50.212912200000005]]}}
point2 = {"type": "Feature", "properties": {"value": 1.0},
          "geometry": {"type": "MultiPoint", "coordinates": [[128.70147399999996, 50.21294230000001]]}}

def pars_point(geojson_data):
    """ Парсинг точек """

def gen_geojson():
    """ Генерация файла """

points = [point, point2]

new_geojson = {}
new_geojson.update({"type": "FeatureCollection"})
new_geojson.update({"name": name})
new_geojson.update({"crs": crs})
new_geojson.update({'features': points})

print(new_geojson)
with open(f'12345.geojson', 'w', encoding='utf8') as f:
    f.write(json.dumps(new_geojson))
