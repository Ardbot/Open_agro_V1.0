import geojson

my_point = geojson.Point((43.24, -1.532))

dump = geojson.dumps(my_point, sort_keys=True)
print(dump)

loads = geojson.loads(dump)
print(loads)
