//  Устанавливаем соединение с websocket

let apiKey = localStorage.getItem("apiKey");

if (apiKey == undefined) {
    console.log("ApiKey не установлен! Введите в настройках.");
}
else {
    var socket = new WebSocket("wss://gis.agrosignal.com/data/play?apiKey=" + apiKey);
    // console.log(socket);

    socket.onopen = function (e) {
    };

    // Обрабатываем ответ
    socket.onmessage = function (event) {
        parseWSagrosignal(event.data);
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            alert(`[close] Соединение закрыто чисто, код: ${event.code} причина=${event.reason}`);
        } else {
            // например, сервер убил процесс или сеть недоступна
            // обычно в этом случае event.code 1006
            alert(`[close] Соединение c Agrosignal прервано. Код: ${event.code}`);
        }
    };

    socket.onerror = function (error) {
        alert(`[error] Agrosignal:`, error);
    };

}

// let dataAS = { "event": "changes", "data": { "time": 1677715200900, "items": [{ "id": 121253, "time": 1675380523000, "last": 1675380523000, "values": { "rt_time": 1675380523000, "position": [127.50855, 50.2895125] } }, { "id": 121245, "time": 1675380397000, "last": 1675380397000, "values": { "rt_time": 1675380397000, "position": [127.74067, 50.183020000000006] } }, { "id": 121138, "time": 1675380525000, "last": 1675380525000, "values": { "rt_time": 1675380525000, "position": [127.76482333333334, 50.25517333333334] } }, { "id": 121270, "time": 1675380528000, "last": 1675380528000, "values": { "rt_time": 1675380528000, "position": [127.76603916666667, 50.2479125] } }] } }

// Соотносит id c номером машины
function carNumF(asId) {
    carsList = JSON.parse(localStorage.getItem('car_list'))
    for (num in carsList) {
        if (asId in carsList[num]) {
            return carsList[num][asId]
        }
    }
}

// Парсим данные с Агросигнала
function parseWSagrosignal(dataAS) {
    let ws = JSON.parse(dataAS); // прод
    // ws = dataAS;    // Отладка

    // Блок с данными
    if (ws?.event == "changes") {
        items = ws.data.items;
        console.log(items);
        for (id in items) {
            let asId = items[id].id;
            // num = carNumF(asId);
            num = asId;

            let asTime = items[id].time;
            let asLast = items[id].last;
            let asValues = items[id].values;
            // log(num, new Date(asTime), new Date(asLast), asValues)

            // Транспорт в движении
            let position = asValues?.position
            if (position != undefined) {
                lat = position[1]
                long = position[0]
                az = asValues.azimuth

                // addMarker([lat, long], carNum = String(num))
                addMarker([lat, long], carNum = String(num), azimuth=az)

                // console.log("pos", lat, long, carNum, );
            }

            // Статичная точка
            let rt_position = asValues?.rt_position
            if (rt_position != undefined) {
                lat = rt_position[1]
                long = rt_position[0]
                // console.log("rt_", lat, long);
            }
            // Позиция
            // Задания

            // position = items[id]?.values?.position
        }

    }
    // Блок с "рукопожатием"
    else if (ws?.event == "youAre") {
        console.log("Авторизация");
        var now = new Date().toISOString();
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

document.querySelectorAll('.parseWS').forEach(el => el.addEventListener('click', () => { parseWSagrosignal(dataAS) }));
document.querySelectorAll('.addMarker').forEach(el => el.addEventListener('click', () => { addMarker([50.01, 128], carNum = '3') }));
document.querySelectorAll('.drawMarker').forEach(el => el.addEventListener('click', () => { drawMarker('3') }));
document.querySelectorAll('.delMarker').forEach(el => el.addEventListener('click', () => { delMarker('3') }));
document.querySelectorAll('.clearMarkers').forEach(el => el.addEventListener('click', () => { clearMarkers() }));