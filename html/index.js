var map = L.map('map', {
  minZoom: 10,
  maxZoom: 18,
}).setView([50,128], 10);

// Подключение базового слоя (подложки)
// Подключение OSM
var tiles_OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  opacity: 1.0, // Прозрачность подложки
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  minZoom: 0,
  maxZoom: 20
}).addTo(map) // Добавляем на карту.
