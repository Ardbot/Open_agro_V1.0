// Базовая карта
var map = L.map('map', {
  minZoom: 5,
  maxZoom: 18,
}).setView([50,128], 10);

// Подключение базового слоя (подложки)
// Подключение OSM
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  opacity: 1.0, // Прозрачность подложки
  attribution: '<a href="https://www.openstreetmap.org/copyright">OSM</a>',
  minZoom: 0,
  maxZoom: 20
}).addTo(map) // Добавляем на карту.

// Перейти к точке на карте
function setView(start_point = [50, 128], zoom = 10) {
  map.setView(start_point, zoom)
}