// Работа с маркерами

// Создать/Обновить маркер
// Добавить в группу

// создаем группу с машинами

// allCarsGroop = L.layerGroup();  // Вся техника
truckGroop = L.layerGroup();  // Грузовики
specialistsGroop = L.layerGroup();  // Специалисты
tractorsGroop = L.layerGroup();  // Тракторы
vehicleGroop = L.layerGroup();  // ТС
snailGroop = L.layerGroup();  // Тихоход
tankerGroop = L.layerGroup();  // Заправщик
harvesterGroop = L.layerGroup();  // Комбайны

otherGroop = L.layerGroup();  // Прочее

// layerControl.addOverlay(allCarsGroop, "Вся техника");
layerControl.addOverlay(truckGroop, "Грузовики");
// layerControl.addOverlay(specialistsGroop, "Специалисты");
layerControl.addOverlay(tractorsGroop, "Тракторы");
layerControl.addOverlay(vehicleGroop, "Автобусы");
layerControl.addOverlay(snailGroop, "Тихоход");
layerControl.addOverlay(tankerGroop, "Заправщик");
layerControl.addOverlay(harvesterGroop, "Комбайн");

layerControl.addOverlay(otherGroop, "Прочее");

// Список техники
var carList = JSON.parse(localStorage.getItem("carList"))

// Список созданных маркеров
var marker = {}


function addMarker([lat = 50, long = 128], id = 0) { // carNum = "0", carNumber, icon, azimuth, carType = "other"

    // Отладка
    // id = String(Math.floor(Math.random() * 5) + 1);
    // ln = Math.random();

    // gra = Math.random();

    // lat = 50 - (gra - ln) / 4
    // long = 128 + (gra + ln) / 4

    if (marker[id]) {
        // Обновляем позицию маркера
        marker[id].setLatLng([lat, long]);
    }

    else {

        carNumber = carList[id]?.number;

        // Создаем маркер
        marker[id] = L.marker([lat, long],{icon: truckIcon}); // , { title: carNum, icon: truckIcon, rotationAngle: azimuth }

        // Добавляем подпись
        marker[id].bindPopup(carNumber);   // Окно
        marker[id].bindTooltip(carNumber, {
            direction: 'bottom',
            permanent: true,
            sticky: true,
            offset: [0, 0],
            opacity: 0.75,
            className: 'leaflet-tooltip-own'
        });    // Надпись при наведении  //.openTooltip()
        marker[id].id = id;

        // Фильтр значений
        carType = carList[id].unitType;
        // console.log(carType);

        switch (carType) {
            case "truck":
                truckGroop.addLayer(marker[id]).addTo(map);
                break;
            case "tractor":
                tractorsGroop.addLayer(marker[id]).addTo(map);
                break;
            case "vehicle":
                vehicleGroop.addLayer(marker[id]);
                break;
            case "tanker":
                tankerGroop.addLayer(marker[id]).addTo(map);
                break;
            case "snail":
                snailGroop.addLayer(marker[id]);
                break;
            case "harvester":
                harvesterGroop.addLayer(marker[id]);
                break;

            default:
                // Иначе создать слой с категорией

                // Или прочее
                otherGroop.addLayer(marker);
        }
    }


}
document.querySelectorAll('.markersBtn').forEach(el => el.addEventListener('click', () => { addMarker(["50.03", "128"]) }));
// function createMarker(carNum) {

//     carNumber = carList[carNum].number;

//     // Создаем маркер
//     carMarkers[carNum] = L.marker([lat, long], { title: carNumber, icon: truckIcon, rotationAngle: azimuth }); // , { title: carNum, icon: truckIcon, rotationAngle: azimuth }

//     // Добавляем подпись
//     carMarkers[carNum].bindPopup(carNumber);   // Окно
//     carMarkers[carNum].bindTooltip(carNumber, {
//         direction: 'bottom',
//         permanent: true,
//         sticky: true,
//         offset: [0, 0],
//         opacity: 0.75,
//         className: 'leaflet-tooltip-own'
//     });    // Надпись при наведении  //.openTooltip()
//     carMarkers[carNum].id = carNum;
//     return 
// }
// Если маркер в группе - меняем позицию

// Фильтруем по группе
// filterCar(carMarkers[carNum])


// Сортируем ТС по категории. Данные с локального хранилища.
// function filterCar(marker) {


//     if (carType == "truck") {
//         truckGroop.addLayer(marker);
//         // console.log("groop:", "truck");
//     }
//     else






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

