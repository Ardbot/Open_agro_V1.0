//  Устанавливаем соединение с websocket
// document.cookie = "user=John; secure";

let apiKey = localStorage.getItem('apiKey').slice(1, -1)
log(apiKey)
// let socket = new WebSocket("wss://gis.agrosignal.com/data/play?apiKey=" + apiKey);

socket.onopen = function (e) {

};

socket.onmessage = function (event) {
    // log(typeof (event))
    // log(event.data)
    // Обрабатываем ответ
    parseWSagrosignal(event.data);

};

socket.onclose = function (event) {
    if (event.wasClean) {
        alert(`[close] Соединение закрыто чисто, код: ${event.code} причина=${event.reason}`);
    } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        alert(`[close] Соединение прервано. Код: ${event.code}`);
    }
};

socket.onerror = function (error) {
    alert(`[error]`, error);
};


// dataAS = { "event": "changes", "data": { "time": 1677715200900, "items": [{ "id": 121253, "time": 1675380523000, "last": 1675380523000, "values": { "rt_time": 1675380523000, "rt_position": [127.50855, 50.2895125] } }, { "id": 121245, "time": 1675380397000, "last": 1675380397000, "values": { "rt_time": 1675380397000, "rt_position": [127.74067, 50.183020000000006] } }, { "id": 121138, "time": 1675380525000, "last": 1675380525000, "values": { "rt_time": 1675380525000, "rt_position": [127.76482333333334, 50.25517333333334] } }, { "id": 121270, "time": 1675380528000, "last": 1675380528000, "values": { "rt_time": 1675380528000, "rt_position": [127.76603916666667, 50.2479125] } }] } }
// log(typeof(dataAS.event))
// Парсим данные с Агросигнала


function parseWSagrosignal(dataAS) {
    ws = JSON.parse(dataAS);
    // ws = dataAS;
    // console.log(dataAS);
    // Блок с данными
    if (ws?.event == "changes") {
        items = ws.data.items;
        for (id in items) {
            let asId = items[id].id;
            let asTime = items[id].time;
            let asLast = items[id].last;
            let asValues = items[id].values;
            // log(asId, asTime, asLast, asValues)

            // Обработка местоположения
            let position = asValues?.position
            if (position != undefined) {
                lat = position[1]
                long = position[0]

                addMarker([lat, long], carNum = String(asId))
                // data = {};
                // carMarker.markers.push([carMarker.markers[asId] = asId, [lat, long]]);
            }
            // Позиция
            // Задания

            // position = items[id]?.values?.position
        }

        // 
        // addMarker();

        // for (car in carMarker.markers) {
        //     // addMarker();
        //     console.log(carMarker.markers[car]);
        // }


        // console.log(carMarker.markers);

    }
    // Блок с "рукопожатием"
    else if (ws?.event == "youAre") {
        console.log("Авторизация");
        var now = new Date().toISOString();
        log(now)
        msg = {
            "event": "start",
            "cid": ws.data.id,
            "data": {
                "from": now,
                "dynamic": [],
                "archiveFrom": null,
                "cid": ws.data.id
            }
        }
        socket.send(JSON.stringify(msg));
    }
    else console.log("Не распознано")
}

// Список маркеров
// var carMarker = [];
// var popup1 = L.popup();
// Добавить маркер
// function addMarker([lat, long], carNum = '0') {

// Создаем маркер
// marker = L.marker([lat, long], { title: carNum });
// markerGroup  Добавить
// Всплывающее окно
// var popup = L.popup()
//     .setLatLng([lat, long])
//     .setContent(String(carNum));

// Добавляем в список
// key = carNum;

// title = marker.options.title;
// lat = marker._latlng.lat;
// long = marker._latlng.lng;

// data = {
//     title,
//     lat,
//     long
// }

// carMarker[key] = data;
// console.log(carMarker);

// var featureGroup = L.featureGroup([markers]).addTo(map);

// }




// }

// // Удаление маркеров
// function markerDelete(markerId) {

// }


// var popup1 = L.popup();
// var marker1, circle1

// if (position != undefined) {

//     lat = position[1]
//     long = position[0]
//     log(lat, long)

//     marker = L.marker([lat, long])
//     // console.log(items[id].id)
//     popup1
//         .setLatLng([lat, long])
//         .setContent(String(items[id]?.id));
//     // circle = L.circle([lat, long], 10)
//     var featureGroup = L.featureGroup([marker, popup1]).addTo(map);
// }

// парсить
