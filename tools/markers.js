// Работа с маркерами

// Для генерации названий 
var carMarkers = {}
// Группа маркеров
var carMarkersGroop = L.layerGroup();

function addMarker([lat = 50, long = 128], carNum = "0") {

    // Отладка
    // carNum = String(Math.floor(Math.random() * 5) + 1);
    // ln = Math.random();

    // gra = Math.random();

    // lat = 50 - (gra - ln) / 4
    // long = 128 + (gra + ln) / 4
    // console.log(lat, long);

    // раб
    // marker = carMarkers[carNum]

    // // Если маркер на карте - меняем позицию
    // if (map.hasLayer(marker)) {
    //     // Меняем позицию маркера
    //     marker.setLatLng([lat, long]);

    //     console.log("Рисую", marker._leaflet_id);
    //     carMarkersGroop.addLayer(marker);
    //     // test
    //     // marker.addTo(map);
    // }
    // else {

    //     carMarkers[carNum] = L.marker([lat, long], { title: carNum }); // Маркер
    //     console.log("Создаю маркер")
    //     carMarkersGroop.addLayer(carMarkers[carNum]);
    //     // test
    //     // carMarkers[carNum].addTo(map);
    // }


    // carMarkers[carNum].options = {  // Опции (проблема с иконками)
    //     title: carNum    
    // }
    // carMarkers[carNum].bindPopup(carNum);   // Окно
    // carMarkers[carNum].bindTooltip(`Car: ${carNum}`).openTooltip();    // Надпись при наведении  //.openTooltip()

}

function carFilter(filter = []) {
    // Фильтрация машин по категории



}

var busMarker = L.layerGroup();

// Отрисовка маркеров
function drawMarker(carNum) {
    // for (i in carMarkersGroop._layers) {
    //     console.log("draw", i);

    //     carMarkersGroop._layers[i].addTo(map)
    // }

    marker = L.marker([lat=50.012, long=128]);
    // marker.options = {}
    
    busMarker.addLayer(marker);
    busMarker.addTo(map);
    console.log(busMarker);



}

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


document.querySelectorAll('.parseWS').forEach(el => el.addEventListener('click', () => { parseWSagrosignal(dataAS) }));
document.querySelectorAll('.addMarker').forEach(el => el.addEventListener('click', () => { addMarker([50.01, 128], carNum = '3') }));
document.querySelectorAll('.drawMarker').forEach(el => el.addEventListener('click', () => { drawMarker('3') }));
document.querySelectorAll('.delMarker').forEach(el => el.addEventListener('click', () => { delMarker('3') }));
document.querySelectorAll('.clearMarkers').forEach(el => el.addEventListener('click', () => { clearMarkers() }));

