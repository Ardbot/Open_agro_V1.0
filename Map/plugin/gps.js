// Группа слоёв для GPS

var overlays = {
  "Дороги": graph
}
// L.control.layers().addOverlay(overlays1).addTo(map)
// L.control.addOverlay(graph, "Дороги");
// L.control.layers(overlays).addOverlay(graph, "Дороги").addTo(map)


layerGroup = L.layerGroup().addLayer(graph).addLayer(graph).addLayer(graph).addTo(map);

layer_control.addOverlay(layerGroup , "My batch of vectors");
layer_control.addOverlay(layerGroup , "My batch of vectors");
layer_control.addOverlay(layerGroup , "My batch of vectors");

// Функция местоположение пользователя.
// function location_user(_watch = false, _setView = false) {
//   let b = new Promise((resolve, reject) => {
//     // Единоразово отображает местоположение.
//     map.locate({
//       watch: _watch,  // Включает GPS
//       setView: _setView  // Включает слежение за позицией
//     }
//     )
//       // Если удалось получить координаты
//       .on('locationfound', function (e) {
//         let gps_point = [e.latitude, e.longitude]; // Текущая координата
//         buff(gps_point, e.accuracy / 2)
//         resolve(gps_point)
//       }
//       )
//       // Если координат получить не удалось
//       .on('locationerror', function (e) {
//         // alert("Включите геолокацию или выберете точку самостоятельно.\n" + e.message)
//         reject(e.message)
//         // return e.message
//       })
//   })
//   b.then(function () {
//     console.log('end' + gps_point);
//     map.setView(gps_point, 14);
//     return gps_point
//   })
// }
function location_user() {
  return new Promise((resolve, reject) => {
    // Если удалось получить координаты
    map.locate().on('locationfound', function (e) {
      buff(e.latlng, e.accuracy / 2)
      resolve(e)
    })
      // Если ошибка
      .on('locationerror', function (e) {
        reject(e.message)
      })
  })
}

function geo_ok(result) {
  // console.log(result);
  latlng = result.latlng
  // map.setView(latlng, 14)
  buff(latlng, result.accuracy / 2)
  console.log(result);

  send_geo()
  return result
}

// Ошибка запроса геоданных
function geo_err(error) {
  console.log("Завершено с ошибкой " + error);
  alert('Ошибка GPS: ' + error)
  return error
}

// Моя позиция
$("#gps").on("click", function () {
  const data = location_user()
  data.then(geo_ok, geo_err); 
})


// Отрисовка //

var gps_groop = L.layerGroup([]);

function buff(current_point, radius) {
  // Отображает радиус местоположения
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
    map.locate({
      watch: always
    })
    location_user()

    $(".gps").prop("disabled", false);
  } else {
    map.stopLocate()
    $(".gps").prop("disabled", true);
  }
})

// $('#gps_on').  //click(function () {

//})

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




