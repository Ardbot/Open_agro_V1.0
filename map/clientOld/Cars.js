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




async function listCar() {
    let response = await fetch("https://gis.agrosignal.com/units");
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        let cars = await response.json();
        console.log(cars);
    } else {
        log("listCar err: " + response.status + " " + response.text);
    }
}


document.querySelectorAll('.listCarBtn').forEach(el => el.addEventListener('click', () => { listCar() }));

// Преобразуем список машин в понятный формат
function parseCar(data) {
    car = {}
    car.id = "000";
    car.number = "X222OP";
    car.type = "truck";
    car.value = {};
    car.value.position = [50, 128];
    car.value.azimut = 45;
    return car
}