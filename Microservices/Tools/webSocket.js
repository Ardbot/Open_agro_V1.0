//  Устанавливаем соединение с websocket

let apiKey = "*******-*******-******-*****"

let socket = new WebSocket("wss://gis.agrosignal.com/data/play?apiKey=" + apiKey);

msg = '{"event":"start","cid": "c1835cff9df550fe122f85dsde-1675056050253-c8998e795181f7b5834721e3","data":{"from":"2023-01-17T15:00:00.000Z","dynamic":[],"archiveFrom":null,"cid": "c1835cff9df550f122f85dsdswdas6fe-1675056050253-c8998e795181f7b5834721e3"}}'

socket.onmessage = function (event) {
    let message = event.data;
    log(message)
    // Авторизация
    // socket.send(msg)
}