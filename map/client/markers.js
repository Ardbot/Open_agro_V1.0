// Работа с маркерами

// создаем группу с машинами

// allCarsGroop = L.layerGroup();  // Вся техника
truckGroop = L.layerGroup();  // Грузовики
specialistsGroop = L.layerGroup();  // Специалисты
tractorsGroop = L.layerGroup();  // Тракторы

otherGroop = L.layerGroup();  // Прочее

// layerControl.addOverlay(allCarsGroop, "Вся техника");
layerControl.addOverlay(truckGroop, "Грузовики");
layerControl.addOverlay(specialistsGroop, "Специалисты");
layerControl.addOverlay(tractorsGroop, "Тракторы");
layerControl.addOverlay(otherGroop, "Прочее");



// Для генерации названий 
var carMarkers = {}
// Группа маркеров
// var carMarkersGroop = L.layerGroup();

function addMarker([lat = 50, long = 128], carNum = "0", icon, azimuth, carType = "other") {
    console.log("Отрисовка маркеров");

    // // Отладка
    // carNum = String(Math.floor(Math.random() * 5) + 1);
    // ln = Math.random();

    // gra = Math.random();

    // lat = 50 - (gra - ln) / 4
    // long = 128 + (gra + ln) / 4


    // Если маркер в группе - меняем позицию
    if (carMarkers[carNum]) {
        // Обновляем позицию маркера
        carMarkers[carNum].setLatLng([lat, long]);
    }

    else {
        // Создаем маркер
        carMarkers[carNum] = L.marker([lat, long], { title: carNum, icon: truckIcon, rotationAngle: azimuth });
        console.log("Создаю маркер", carNum)

        // Добавляем подпись
        carMarkers[carNum].bindPopup(carNum);   // Окно
        carMarkers[carNum].bindTooltip(carNum, {
            direction: 'bottom',
            permanent: true,
            sticky: true,
            offset: [0, 0],
            opacity: 0.75,
            className: 'leaflet-tooltip-own'

        });    // Надпись при наведении  //.openTooltip()

    }
    // Фильтруем по группе
    filterCar(carMarkers[carNum])
}

// Сортируем ТС по категории 
function filterCar(marker) {
    carType = "truck"   // Получаем из свойства
    if (carType == "truck") {
        truckGroop.addLayer(marker);
        // console.log("groop:", "truck");
    }
    else {
        otherGroop.addLayer(marker);
        // console.log("groop:", "other");
    }
}


document.querySelectorAll('.markersBtn').forEach(el => el.addEventListener('click', () => { addMarker(["50.03", "128"]) }));



async function listCar() {
    // let response = await fetch("https://gis.agrosignal.com/units"); https://example.com
    let response = await fetch("https://example.com"); 
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        let cars = await response.json();
        console.log(cars);
    } else {
        log("listCar err: " + response.status + " " + response.text);
    }
}


document.querySelectorAll('.listCarBtn').forEach(el => el.addEventListener('click', () => { listCar() }));


// Удалить маркер
function delMarker(carNum) {
    carNum = String(Math.floor(Math.random() * (5 + 1)) + 0);
    map.removeLayer(carMarkers[carNum])

}

// Удалить маркеры (Очистить)
function clearMarkers() {
    carMarkersGroop.clearLayers();
    console.log(carMarkersGroop);
}



// L.marker([50.05, 128], {icon: myIcon}).addTo(map);

