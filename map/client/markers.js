// Работа с маркерами

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

// Для генерации названий 
var carMarkers = {}
// Группа маркеров
// var carMarkersGroop = L.layerGroup();

function addMarker([lat = 50, long = 128], carNum = "0", carNumber, icon, azimuth, carType = "other") {

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


        // Инициализация параметров маркера
        // options = 

        carNumber = carList[carNum].number;

        // Создаем маркер
        carMarkers[carNum] = L.marker([lat, long], { title: carNumber, icon: truckIcon, rotationAngle: azimuth }); // , { title: carNum, icon: truckIcon, rotationAngle: azimuth }

        // Добавляем подпись
        carMarkers[carNum].bindPopup(carNumber);   // Окно
        carMarkers[carNum].bindTooltip(carNumber, {
            direction: 'bottom',
            permanent: true,
            sticky: true,
            offset: [0, 0],
            opacity: 0.75,
            className: 'leaflet-tooltip-own'
        });    // Надпись при наведении  //.openTooltip()
        carMarkers[carNum].id = carNum;



    }
    // Фильтруем по группе
    filterCar(carMarkers[carNum])
}

// Сортируем ТС по категории. Данные с локального хранилища.
function filterCar(marker) {

    carType = carList[marker.id].unitType;
    if (carType == "truck") {
        truckGroop.addLayer(marker);
        // console.log("groop:", "truck");
    }
    else

        switch (carType) {
            case "truck":
                truckGroop.addLayer(marker).addTo(map);
                break;
            case "tractor":
                tractorsGroop.addLayer(marker);
                break;
            // case "specialists":
            //     specialistsGroop.addLayer(marker);
            //     break;
            case "vehicle":
                vehicleGroop.addLayer(marker);
                break;
            case "tanker":
                tankerGroop.addLayer(marker);
                break;
            case "snail":
                snailGroop.addLayer(marker);
                break;
            case "harvester":
                harvesterGroop.addLayer(marker);
                break;

                

            default:
                otherGroop.addLayer(marker);
        }
}

document.querySelectorAll('.markersBtn').forEach(el => el.addEventListener('click', () => { addMarker(["50.03", "128"]) }));


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

