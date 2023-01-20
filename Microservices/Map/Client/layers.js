//  Управление слоями

// Подключение базового слоя (подложки)
// Подключение OSM
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  opacity: 1.0, // Прозрачность подложки
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  minZoom: 0,
  maxZoom: 20
}).addTo(map) // Добавляем на карту.

var baseMaps = {
    "OpenStreetMap": osm
    // "Mapbox Streets": streets
};



var littleton = L.marker([50.02, 128]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([50.03, 128]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([50.04, 128]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([50.05, 128]).bindPopup('This is Golden, CO.');

var cities = L.layerGroup([littleton, denver, aurora, golden]);

var overlayMaps = {
    "Автобусы": cities,
    "Грузовики": cities
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);