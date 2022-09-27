// Файл для отрисовки элементов

// Элемент зума (Масштаба)
// map.zoomControl.remove(); // Удаляет стандартную панель
L.control.zoom({
    position: 'bottomright'
  }).addTo(map);
  
  // Выводит текущий зум
  map.on('zoomend', function () {
    $("#zoom").text(map.getZoom())
  });

