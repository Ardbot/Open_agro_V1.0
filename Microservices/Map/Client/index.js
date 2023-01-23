// Базовая карта
var map = L.map('map', {
  minZoom: 10,
  maxZoom: 18,
}).setView([50,128], 10);


// // Контура полей (fields)
// var field = L.geoJson(get_localStorage('/api/map/fields'), {
//   onEachFeature: function (feature, lyr) {


//     // Выводим ярлык с номером поля (можно HTML)
//     let text_html = '<div><h3>Поле №' + feature.properties.Name + '</h3><h4> Площадь: ' + feature.properties.area + ' га</h4></div>'//<button id="map_b1">Путь сюда</button>'
//     lyr.bindPopup(text_html);
//     // Выводится ярлык при наведении
//     // lyr.bindTooltip("Поле №: "+ feature.properties.Name).openTooltip();
//   },
//   style: {
//     "color": "#006eff", // Цвет контура файл (leaflet.js)
//     "weight": 1, // Толщина контура
//     "opacity": 0.65, // Прозрачность контура
//     "fillColor": "#00FF00", // Заливка контура
//     "fillOpacity": 0.04, // Прозрачность заливки
//   }
// }).addTo(map); // Сразу добавляет слой на карту

// Перейти к точке на карте
function setView(start_point = [50, 128], zoom = 10) {
  map.setView(start_point, zoom)
}
