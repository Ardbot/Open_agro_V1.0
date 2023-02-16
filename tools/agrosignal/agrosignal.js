// Получение данных Агросигнала (со сторонего сервера)

// let apiKey = localStorage.getItem('apiKey').slice(1, -1)    // Берём из локального хранилища (Небезопасно. Использовать куки) 


// Список транспортных средств
async function listCar() {
    // let response = await fetch("/as/car_list");
    let response = await fetch("https://ardbot.ru:8443/tools/car_list.json");

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        let cars = await response.json();
        // console.log("cars", cars);
        // Сохраняем в локальное хранилище браузера]
        localStorage.setItem('carList', JSON.stringify(cars))
        // return cars  
    } else {
        console.log("listCar err: " + response.status + " " + response.text);
    }
}

listCar()

document.querySelectorAll('.listCarBtn').forEach(el => el.addEventListener('click', () => { listCar() }));