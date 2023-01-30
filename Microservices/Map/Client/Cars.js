// Машины

cars_list_db = new Local_DB("cars_list")

// Обновляет список машин в локальной памяти устройства
async function getCars() {
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

// Отрисовка списка в элемент   *заменить на другой файл*
async function cars_list() {
    cars = cars_list_db.read();
    carsDiv = document.getElementById("right_column")
    // headings(['id', "Номер"])
    for (car in cars) {
        car_li = document.createElement('li')
        car_li.textContent = JSON.stringify(cars[car])
        carsDiv.append(car_li)
    }
}



document.querySelectorAll('.refresh_list_cars').forEach(el => el.addEventListener('click', () => { cars_list() }));