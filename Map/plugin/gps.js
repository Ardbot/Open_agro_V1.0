// Группа слоёв для GPS


// Функция местоположение пользователя.
function location_user(_watch = false, _setView = false) {
  // Единоразово отображает местоположение.
  let gps_point = []
  map.locate({
    watch: _watch,  // Включает GPS
    setView: _setView  // Включает слежение за позицией
  }
  )
    // Если удалось получить координаты
    .on('locationfound', function (e) {
      gps_point = [e.latitude, e.longitude]; // Текущая координата
      buff(gps_point, e.accuracy / 2)
    }
    )
    // Если координат получить не удалось
    .on('locationerror', function (e) {
      // alert("Включите геолокацию или выберете точку самостоятельно.\n" + e.message)
      // return e.message
    })
  return gps_point
}

// Моя позиция
$("#gps").on("click", function () {
  data = location_user()
  console.log(data);
  map.setView(data, 16)
})


// Отрисовка //

var gps_groop = L.layerGroup([]);

function buff(current_point, radius) {
  // Отображает радиус местоположения
  // map.setView(current_point, 14)
  var circle = L.circle(current_point, radius, {
    weight: 1,
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0
  }) //.bindPopup('Точность' + e.accuracy / 2 + ' метров').openPopup();

  // $("#inputA").attr('placeholder', current_point)
  // Отрисовка круга
  gps_groop.addLayer(circle).addTo(map)
}

// Моя позиция
$("#clear_gps_groop").on("click", function () {
  gps_groop.clearLayers();
})

// Включаем навигацию
$('#gps_on').click(function () {
  if ($('#gps_on').is(':checked')) {
    location_user(_watch = true)
    $(".gps").prop("disabled", false);
  } else {
    map.stopLocate()
    $(".gps").prop("disabled", true);
  }
})

// Следуем за навигацией
$('#gps_check').click(function () {
  if ($('#gps_check').is(':checked')) {
    map.locate({
      setView: true
    })

  } else {
    map.locate({
      setView: false
    })
  }
});

function tracking() {
  // Слежение за позицией
  map.setView(start_point, 16)
}




