// Группа слоёв для GPS


// Функция местоположение пользователя.
function location_user(watch=false, setView=false) {
  // Единоразово отображает местоположение.
  map.locate({
    watch: watch,
    setView:setView
  }
  )
    // Если удалось получить координаты
    .on('locationfound', function (e) {
      let start_point = [e.latitude, e.longitude]; // Текущая координата
      buff(start_point, e.accuracy/2)
      console.log(start_point);
      return start_point
    }
    )
    // Если координат получить не удалось
    .on('locationerror', function (e) {
      alert("Включите геолокацию или выберете точку самостоятельно.\n" + e.message)
      return e.message
    })

}

// Моя позиция
$("#gps").on("click", function () {
  // alert('ok')
  location_user()
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


$('#gps_on').click(function () {
  if ($('#gps_on').is(':checked')) {
    location_user(watch=true,setView=true)
  } else {
    map.stopLocate()
  }
})


$('#gps_check').click(function () {
  if ($('#gps_check').is(':checked')) {
    map.locate({
      setView: true
    })
  } else {

  }
});

function tracking() {
  // Слежение за позицией
  map.setView(start_point, 16)
}




