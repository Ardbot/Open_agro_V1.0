$("#test").on("click", function () {
    // Начало
    // alert('тест gps')
    // send_geo()
    console.log(field);

    // повторить с интервалом 2 секунды
    // let timerId = setInterval(() => send_geo(), 2000);

    // остановить вывод через 5 секунд
    // setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 10000);
    // send_message_to_tg()

})

function send_geo() {
    map.locate().on('locationfound', function (e) {
        // 1. Создаём новый XMLHttpRequest-объект
        let xhr = new XMLHttpRequest();
    
        geo = 'https://www.google.com/maps/@' + e.latlng.lat + ',' + e.latlng.lng + ',' + '16z'
        api = '51641..'
        chat_id = '7452...'
        // 2. Настраиваем его: GET-запрос по URL /article/.../load
        // xhr.open('GET', 'https://api.telegram.org/bot' + api + '/sendMessage?chat_id=' + chat_id + '&text=' + geo);

        // 3. Отсылаем запрос
        // xhr.send();

        // 4. Этот код сработает после того, как мы получим ответ сервера
        xhr.onload = function () {
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else { // если всё прошло гладко, выводим результат
                // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
            }
        }
        console.log(e.latlng.lat);
        return e
    })
}



    // let b = new Promise((resolve, reject) => {
    //     // Если удалось получить координаты
    //     map.locate().on('locationfound', function (e) {
    //         gps_point = [e.latitude, e.longitude]; // Текущая координата
    //         buff(gps_point, e.accuracy / 2)
    //         // console.log('GPS ' + gps_point);
    //         resolve(gps_point)
    //         // return gps_point
    //     })
    //         .on('locationerror', function (e) {
    //             // alert("Включите геолокацию или выберете точку самостоятельно.\n" + e.message)
    //             reject(2)
    //             // return e.message
    //         })
    // })
    // b.then(function () {
    //     console.log(gps_point);
    //     map.setView(gps_point, 14);
    // })

    // Конец

    