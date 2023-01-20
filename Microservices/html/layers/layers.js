
// Добавляем векторные слои

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
  
  
  var graph = L.geoJson(graph, { // Грузит файл field.js из папки "layers"
    onEachFeature: function (feature, lyr) {
      // Выводим ярлык с номером поля (можно HTML)
      let text_html = '<div><h3>Дорога №' + feature.properties.name + '</h3>'
      lyr.bindPopup(text_html);
      // Выводится ярлык при наведении
      // lyr.bindTooltip("Поле №: "+ feature.properties.Name).openTooltip();
    },
    style: {
      "color": "#006e00", // Цвет контура
      "weight": 1, // Толщина контура
      "opacity": 0.65, // Прозрачность контура
      // "fillColor": "#00FF00", // Заливка контура
      "fillOpacity": 0, // Прозрачность заливки
    }
  }).addTo(map); // Сразу добавляет слой на карту
  
  
  // Базовые слои (подложка)
  var baseLayers = {
    "OpenStreetMap": tiles_OSM
  };
  
  // Слои поверх подложки
  var overlays = {
    "Поля": field,
    // "Дороги": graph
  };
  
  // Выводим панель управления слоями на карту
  layer_control = L.control.layers(baseLayers, overlays).addTo(map)