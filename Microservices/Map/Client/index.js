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
request_api('POST', '/api/map/fields')


}

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


// Контура полей (fields)
var field = L.geoJson(get_localStorage('/api/map/fields'), {
  onEachFeature: function (feature, lyr) {


    // Выводим ярлык с номером поля (можно HTML)
    let text_html = '<div><h3>Поле №' + feature.properties.Name + '</h3><h4> Площадь: ' + feature.properties.area + ' га</h4></div>'//<button id="map_b1">Путь сюда</button>'
    lyr.bindPopup(text_html);
    // Выводится ярлык при наведении
    // lyr.bindTooltip("Поле №: "+ feature.properties.Name).openTooltip();
  },
  style: {
    "color": "#006eff", // Цвет контура файл (leaflet.js)
    "weight": 1, // Толщина контура
    "opacity": 0.65, // Прозрачность контура
    "fillColor": "#00FF00", // Заливка контура
    "fillOpacity": 0.04, // Прозрачность заливки
  }
}).addTo(map); // Сразу добавляет слой на карту


//Установка точки
function setView(start_point = [50, 128], zoom = 10) {
    map.setView(start_point, zoom)
}

// Запросы с локального хранилища
function get_localStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

// Записать данные в локальное хранилище
function set_localStorage(key, date){
    localStorage.setItem(key, date)
}

// Удалить данные с локального хранилища
function del_localStorage(key, date){
    localStorage.removeItem(key)
}

// Кнопка "Домой"
async function home() {
    value = get_localStorage('/api/map/home')
    console.log(value)
    setView(value.message.latlong, value.message.zoom)
}