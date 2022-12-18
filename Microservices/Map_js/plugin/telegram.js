// Отправляет сообщение в телеграм

function send_message_to_tg(url){
    // 1. Создаём новый XMLHttpRequest-объект
    let xhr = new XMLHttpRequest();

    // 2. Настраиваем его: GET-запрос по URL
    xhr.open('GET', url);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Этот код сработает после того, как мы получим ответ сервера
    xhr.onload = function () {
        if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            return 
        } else { // если всё прошло гладко, выводим результат
            // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
            return
        }
    }
}