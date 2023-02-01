async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

// postData('https://example.com/answer', { answer: 42 })
//   .then((data) => {
//     console.log(data); // JSON data parsed by `response.json()` call
//   });

  //var start_point = [50.0, 128.0];
//var zoom = 10
//console.log(start_point, zoom);

// Запрос конфигурационного файла

// Асинхронный запрос к API
async function request_api(method, url, body = null){
  // Отправляем запрос
  const response = await fetch(url, {
          method: method,
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(body)
      });
//        Если сервер ответил 200-299,
      if (response.ok) {
//                console.log('resp', response)
              const data = await response.json();

              if (data == null) {
                  console.log(url, ': No data')
                  return null
              }
              else {
              console.log('OK', data)
//              то обновляем локальное хранилище
              localStorage.setItem(url, JSON.stringify(data))
              return data
              }
      }
//        Если ошибка сервера, берем данные с локального хранилища
      else    {
          console.log('Ошибка запроса')
          value = localStorage.getItem(url)
          return value
      }
}

// Получение контуров полей
async function get_field() {
request_api('POST', '/api/map/fields')
console.log('645456')
}

async function get_geo() {
  // log("testst")

  url = "/api/map/geo";
  let response = await fetch(url);

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
    log(json.lat, json.lng)
    setView([json.lng, json.lat], 14)
    lat = json.lat;
    lng = json.lng
    // var newMarker = new L.marker(lat, lng).addTo(map);
    var newMarker = new L.marker([json.lng, json.lat]);
    newMarker.addTo(map)
    // setView()
    // log(json)
  } else {
    log("Ошибка HTTP: " + response.status);
  }

  // request_api("GET", "/api/map/geo"); //, body = `unitId=${unitId}`
  // request_api("GET", "/api/map/fields"); //, body = `unitId=${unitId}`
}







// Проверка данных в локальном хранилище
function check_local_storage(key) {
  value = localStorage.getItem(key)
  if (value == null) {
      console.log('No date in local storage')
      return null
          }
  else {
      console.log('storage')
      return value
  }
}

// Выгрузка данных с сервера
//function get_data(url, key) {
//    data = request_api('POST', '/api/map/home')
//    if (data != null) {
//        localStorage.setItem(key, JSON.stringify(data))
//    }
//}

// setting Запрос настроек с сервера во время загрузки страницы.
function get_setting() {
request_api('POST', '/api/map/home')   // Стартовая точка
//request_api('GET', '/api/map/home')   // Стартовая точка
// request_api('POST', '/api/map/fields')


}

// log(request_api('GET', '/api/map/car_list'))