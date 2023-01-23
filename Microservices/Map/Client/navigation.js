// Блок навигации для leaflet

// Домашняя точка
map_home = new Local_DB("map_home");

// Запрашиваем домашнюю точку с сервера
async function getHome() {
    let response = await fetch("/map/home");
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        
        let home = await response.json();
        map_home.write(home)    // [50, 128]
    } else {
        log("Home err: " + response.status);
    }
}

// Кнопка "Домой"
async function home() {
    setView(map_home.read(), map_zoom.read())
}

// Сохраняем текущее местоположение карты 
map_centre = new Local_DB("map_centre");
map.on("moveend", function () {
    map_centre.write(map.getCenter())
})

// Сохраняем зум карты 
map_zoom = new Local_DB("map_zoom");
map.on("zoomend", function () {
    map_zoom.write(map.getZoom());
})

// Устанавливаем вид карты в точку
setView(map_centre.read(), map_zoom.read())


var popup = L.popup();

// var content = {"<button>Путь сюда</button>"}
    


// Отображает меню по правому клику
function locationPopup(e, content="no_data") {
    popup
        .setLatLng(e.latlng)
        .setContent(content)
        .openOn(map);
}

map.on("contextmenu", locationPopup)
// map.on("contextmenu", )

// Отрисовка списка техники
cars_list_db = new Local_DB("cars_list")