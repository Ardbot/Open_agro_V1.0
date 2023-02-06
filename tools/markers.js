// Работа с маркерами


// Группа маркеров
// var carMarkers = L.layerGroup();
// var carMarkers = {}
// var carMarkers1 = {}


// // Добавляет реквизиты маркера в список
// function addMarker(carNum = "0", [lat = 50, long = 128]) {
//     // carNum = String(Math.floor(Math.random() * (5 + 1)) + 0);

//     // Перезаписывает ключи
//     // carMarkers[carNum] = { latlng: [lat, long] }

//     carMarkers1[carNum] = L.marker([lat, long]).addTo(map);
//     console.log(carMarkers1);
// }

// // Отрисовка маркеров
// function drawMarker() {
//     // console.log(carMarkers);

//     for (i in carMarkers) {
//         marker = L.marker(carMarkers[i].latlng, { title: i }).addTo(map);
//     }
//     console.log(carMarkers);

// }


var carMarkers = {}
// Группа маркеров
var carMarkersGroop = L.layerGroup();

function addMarker(carNum = "0", [lat = 50, long = 128]) {

    marker = L.marker([lat, long]);
    marker.options = {
        title: carNum,
    }
    carMarkersGroop.addLayer(marker);
}


// Отрисовка маркеров
function drawMarker() {
    // carMarkersGroop.addTo(map)
    console.log(carMarkersGroop.getLayers());
}

// Удалить маркер
function delMarker(id) {
    console.log(id);
    carMarkersGroop.removeLayer(id);
}

// Удалить маркеры (Очистить)
function clearMarkers() {
    console.log("clear");
    carMarkersGroop.clearLayers();
}


document.querySelectorAll('.parseWS').forEach(el => el.addEventListener('click', () => { parseWSagrosignal(dataAS) }));
document.querySelectorAll('.addMarker').forEach(el => el.addEventListener('click', () => { addMarker(carNum = 3, [50.01, 128]) }));
document.querySelectorAll('.drawMarker').forEach(el => el.addEventListener('click', () => { drawMarker() }));
document.querySelectorAll('.delMarker').forEach(el => el.addEventListener('click', () => { delMarker(3) }));
document.querySelectorAll('.clearMarkers').forEach(el => el.addEventListener('click', () => { clearMarkers() }));

