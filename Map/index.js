var start_point = [50.253313, 127.8073497]
// const tilesPatch = 'localhost:8080/tiles/'

// Путь к определеной папке с тайлами 
// const UAV = 'UAV/{z}/{x}/{y}.png' // http://localhost:8080/Tiles/UAV/{z}/{x}/{y}.png

// Создаем пустую карту, зум. Устанавливаем центральную точку и масштаб (13)
var map = L.map('map', { // Используется библиотека Leaflet
  zoomControl: false,
  minZoom: 10,
  maxZoom: 18,
  fullscreenControl: true
}).setView(start_point, 13);

// Подключение базовых слоев (подложек)
// Подключение OSM
var tiles_OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  opacity: 1.0, // Прозрачность подложки
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  minZoom: 0,
  maxZoom: 20
}).addTo(map) // Добавляем на карту.


L.control.locate().addTo(map);




