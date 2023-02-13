// Блок навигации для leaflet. Сохраняет локально масштаб, местоположение

// Домашняя точка
map_home = new Local_DB("map_home");

// Запрашиваем домашнюю точку с сервера
async function getHome() {
    let response = await fetch("/map/home");
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        let home = await response.json();
        map_home.write(home)    // [50, 128]  
    } else {
        log("Home err: " + response.status + " " + response.text);
    }
}

// Кнопка "Домой"
async function home() {
    getHome();
    setView(map_home.read(), map_zoom.read())
}
document.querySelectorAll('.homeBtn').forEach(el => el.addEventListener('click', () => { home() }));

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

var dawew = '<h2>Label</h2>'




// Отображает меню по правому клику
function locationPopup(e, content = "no_data") {
    popup
        .setLatLng(e.latlng)
        .setContent(JSON.stringify([e.latlng['lat'], e.latlng['lng']])) 
        .openOn(map);
}

map.on("contextmenu", locationPopup)
// map.on("contextmenu", )

// // Отрисовка списка техники
// cars_list_db = new Local_DB("cars_list")

// async function cars_list(data) {
//     cars_list_db.write(data)
// }


// async function cars() {
//     let response = await fetch("/as/car_list");
//     if (response.ok) { // если HTTP-статус в диапазоне 200-299
//         // получаем тело ответа (см. про этот метод ниже)
//         let cars = await response.json();
//         cars_list_db.write(cars)
//         cars_list();
//     } else {
//         alert("Ошибка HTTP: " + response.status);
//     }
// }

// // Выводим список в элемент
// async function cars_list() {
//     cars = cars_list_db.read();
//     createTable("right_column");
//     headings(["id", "Номер"]);
//     for (car in cars) {
//         // num = car;
//         idCar = Object.keys(cars[car]);
//         gos =  Object.values(cars[car]);
//         body([idCar, gos])
//     }
// }

// document.querySelectorAll('.createTable').forEach(el => el.addEventListener('click', () => { cars_list() }));




