var start_point = [50.21631853, 127.95687106]
var end_point = []

const tilesPatch = 'localhost:8080/tiles/'

// Путь к определеной папке с тайлами 
const UAV = 'UAV/{z}/{x}/{y}.png' // http://localhost:8080/Tiles/UAV/{z}/{x}/{y}.png

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

// Добавляем дополнительные слои
//Добавляем тайлы с БПЛА
var photo_UAV = L.tileLayer(tilesPatch + UAV, {
    // opacity:0.8,
    minZoom: 10,
    maxZoom: 18,
    // errorTileUrl: 'Tiles/404.png',  // При отсутствии тайла выводит картинку
    tms: false,
    attribution: '<a href="https://youtube.com/playlist?list=PLZXyPjhb3eKP7jtEcr3ZKRJe_iBpNyTun">My_tiles</a>'
}).addTo(map)


// Добавляем векторные слои (shp файлы)
// Контура полей (fields)
var field = L.geoJson(field, { // Грузит файл field.js из папки "layers"
    onEachFeature: function (feature, lyr) {
        // Выводим ярлык с номером поля (можно HTML)
        let text_html = '<div><h3>Поле №' + feature.properties.Name + '</h3><h4> Площадь: ' + feature.properties.area + ' га'
        lyr.bindPopup(text_html);
        // Выводится ярлык при наведении
        // lyr.bindTooltip("Поле №: "+ feature.properties.Name).openTooltip();
    },
    style: {
        "color": "#006eff", // Цвет контура
        "weight": 1, // Толщина контура
        "opacity": 0.65, // Прозрачность контура
        // "fillColor": "#00FF00", // Заливка контура
        "fillOpacity": 0, // Прозрачность заливки
    }
}).addTo(map); // Сразу добавляет слой на карту

// Контура зон (alias)
var alias = L.geoJson(alias, { // Грузит файл alias.js из папки "layers"
    onEachFeature: function (feature, lyr) {
      // Выводим ярлык с номером поля (можно HTML)
      lyr.bindPopup("Зона: " + feature.properties.Name)
      // Выводится ярлык при наведении
      // lyr.bindTooltip("Поле №: "+ feature.properties.Name).openTooltip();
    },
    style: {
      "color": "#0000FF", // Цвет контура файл (leaflet.js)
      "weight": 2, // Толщина контура
      "opacity": 0.65, // Прозрачность контура
      // "fillColor": "#00FF00", // Заливка контура
      // "fillOpacity": 0.1, // Прозрачность заливки
    }
  }); // Слой не отображается. Доступен в легенде карты


  // Базовые слои (подложка)
var baseLayers = {
    "OpenStreetMap": tiles_OSM
  };

  // Слои поверх подложки
var overlays = {
    "Поля": field,
    "Зоны": alias,
    "Карта с БПЛА": photo_UAV, //Иначе использовать другую подложку
  };

  // Выводим панель управления слоями на карту
L.control.layers(baseLayers, overlays).addTo(map)

// Элемент зума (Масштаба)
// map.zoomControl.remove(); // Удаляет стандартную панель
L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  