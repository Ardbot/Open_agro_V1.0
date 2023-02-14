//  Управление слоями

// Подключение базового слоя (подложки)


// Контура
// Контура полей (fields)
var field = L.geoJson(field, {
  onEachFeature: function (feature, lyr) {

    // Выводим ярлык с номером поля (можно HTML)
    let text_html = '<div><h3>Поле №' + feature?.properties?.Name + '</h3><h4> Площадь: ' + feature?.properties?.area + ' га</h4></div>'//<button id="map_b1">Путь сюда</button>'
    lyr.bindPopup(text_html);
    // Выводится ярлык при наведении
    // lyr.bindTooltip("Поле №: "+ feature.properties.Name).openTooltip();
  },
  style: {
    "color": "#006eff", // Цвет контура файл (leaflet.js)
    "weight": 1, // Толщина контура
    "opacity": 0.65, // Прозрачность контура
    "fillColor": "#00FF00", // Заливка контура
    "fillOpacity": 0.04, // Прозрачность заливки
  }
}).addTo(map); // Сразу добавляет слой на карту


var baseMaps = {
  "OpenStreetMap": osm,

};




var overlayMaps = {
  "Поля": field,

};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

car1 = L.marker([50, 128.02])
car2 = L.marker([50, 128.03])
car3 = L.marker([50, 128.05])

// truck
truck1 = L.marker([50.0, 128])
truck2 = L.marker([50.03, 128])
truck3 = L.marker([50.05, 128])

var truck = L.layerGroup()
  .addLayer(truck1)
  .addLayer(truck2)
  .addLayer(truck3)

var car = L.layerGroup()
  .addLayer(car1)
  .addLayer(car2)
  .addLayer(car3)

var allCars = L.layerGroup()
  .addLayer(truck)
  .addLayer(car)

// if (layerControl === false) {  // var layerControl set to false in init phase; 
//   layerControl = L.control.layers().addTo(map);
// }

// layerControl.addOverlay(allCars, "allCars");
// layerControl.addOverlay(truck, "truck");
// layerControl.addOverlay(car, "car");
// layerControl.addOverlay(car1, "car1");


