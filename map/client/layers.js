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
  "pass":field,

};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);