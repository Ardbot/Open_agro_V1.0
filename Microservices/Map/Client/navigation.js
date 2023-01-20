// Блок навигации

// Домашняя точка
map_home = new Local_DB("map_home");

// Запрашиваем с сервера
map_home.write([50, 128]);

// Кнопка "Домой"
async function home() {
    setView(map_home.read(), map_zoom.read())
}


// Сохраняем местоположение карты 
map_centre = new Local_DB("map_centre");
map.on("moveend", function () {
    map_centre.write(map.getCenter())
})

// Сохраняем зум карты 
map_zoom = new Local_DB("map_zoom");
map.on("zoomend", function () {
    map_zoom.write(map.getZoom());
    // log(map_zoom.read());
})

// Устанавливаем прошлый вид карты
setView(map_centre.read(), map_zoom.read())


var popup = L.popup();

function context_menu(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Ваше местоположение " + e.latlng.toString())
        .openOn(map);
}

map.on("contextmenu", cars_list)
// map.on("contextmenu", )

// Отрисовка списка техники
cars_list_db = new Local_DB("cars_list")

async function cars_list(data) {
    cars_list_db.write(data)
}



async function cars() {
    let response = await fetch("/api/map/car_list");
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let cars = await response.json();
        cars_list_db.write(cars)
        cars_list();
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}


// Выводим список в элемент
async function cars_list() {
    cars = cars_list_db.read();
    carss = document.getElementById("right_column")
    log("Отрисовка ");
    for (car in cars) {
        car_li = document.createElement('li')
        car_li.textContent = JSON.stringify(cars[car])
        carss.append(car_li)
        // log(cars[car])
    }
}

document.querySelectorAll('.refresh_list_cars').forEach(el => el.addEventListener('click', () => { cars() }));




