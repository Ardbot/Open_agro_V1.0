//  Устанавливаем соединение с websocket
// document.cookie = "user=John; secure";

let apiKey = localStorage.getItem('apiKey').slice(1, -1)
log(apiKey)
let socket = new WebSocket("wss://gis.agrosignal.com/data/play?apiKey=" + apiKey);

// msg = '{"event":"start","cid": "5c849875b7","data":{"from":"2023-02-01T15:00:00.000Z","dynamic":[],"archiveFrom":null,"cid": "5c8498d0bf75b7"}}'




socket.onopen = function (e) {
    // Выполняем рукопожатие

};

socket.onmessage = function (event) {
    // console.log(event.data)
    parseWS(event.data);
};

socket.onclose = function (event) {
    if (event.wasClean) {
        alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        alert('[close] Соединение прервано');
    }
};

socket.onerror = function (error) {
    alert(`[error]`);
};


function parseWS(data) {
    ws = JSON.parse(data);
    if (ws?.event == "changes") {
        items = ws.data.items;
        // console.log(items)
        for (id in items) {
            var marker1, circle1

            var popup1 = L.popup();
            position = items[id]?.values?.position
            if (position != undefined) {

                lat = position[1]
                long = position[0]
                log(lat, long)

                marker = L.marker([lat, long])
                console.log(items[id].id)
                popup1
                    .setLatLng([lat, long])
                    .setContent(String(items[id]?.id));
                // circle = L.circle([lat, long], 10)
                var featureGroup = L.featureGroup([marker, popup1]).addTo(map);
            }
        }
    }

    else if (ws?.event == "youAre") {
        msg = {
            "event": "start",
            "cid": ws.data.id,
            "data": {
                "from": "2023-03-02T00:00:00.900Z",
                "dynamic": [],
                "archiveFrom": null,
                "cid": ws.data.id
            }
        }
        socket.send(JSON.stringify(msg));
    }
}