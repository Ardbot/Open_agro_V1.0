// Машины

async function cars_list(data) {
    cars_list_db.write(data)
}

// Обновляет список машин в локальной памяти устройства
async function cars() {
    let response = await fetch("/cars/car_list");
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let cars = await response.json();
        cars_list_db.write(cars)
        cars_list();
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}


// Выводим список в элемент
async function cars_list() {
    cars = cars_list_db.read();
    carss = document.getElementById("right_column")
    log("Отрисовка ");
    for (car in cars) {
        car_li = document.createElement('li')
        car_li.textContent = JSON.stringify(cars[car])
        carss.append(car_li)
        // log(cars[car])
    }
}

document.querySelectorAll('.refresh_list_cars').forEach(el => el.addEventListener('click', () => { cars() }));