//  Устанавливаем соединение с websocket
// document.cookie = "user=John; secure";

let apiKey = localStorage.getItem('apiKey').slice(1, -1)
log(apiKey)
let socket = new WebSocket("wss://gis.agrosignal.com/data/play?apiKey=" + apiKey);

// msg = '{"event":"start","cid": "5c849875b7","data":{"from":"2023-02-01T15:00:00.000Z","dynamic":[],"archiveFrom":null,"cid": "5c8498d0bf75b7"}}'
msg = {
    "event": "start",
    "cid": "5c8bf75b7",
    "data": {
        // "from": "2023-02-02T15:00:00.000Z",
        "from": "2023-02-02T16:05:32.900Z",
        "dynamic": [],
        "archiveFrom": null,
        "cid": "5c84975b7"
    }
}

msgJson = JSON.stringify(msg)

socket.onopen = function (e) {
    // Выполняем рукопожатие
    socket.send(msgJson);
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
    // console.log(ws?.data?.items); [1].values.rt_position
    items = ws?.data?.items;
    for (id in items) {
        console.log(items[id].values.rt_position); 
    }
}