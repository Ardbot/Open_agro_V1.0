// Информация о метке

animal = new Animal("00:00:00:00", "{}");  // Создаем экземляр класса для работы с выборкой

// Обновляет информацию на экране
function info_nfc(id, data) {
    try {
        // Обновляем данные
        animal.set_id(id);
        animal.set_data(data);

        // Обновляем HTML
        document.querySelector(".nfc_id").textContent = animal.get_id();
        document.querySelector(".number_animal").textContent = animal.number();
        document.querySelector(".gender").textContent = animal.gender();
        document.querySelector(".dob_animal").textContent = animal.dob();
        document.querySelector(".breed").textContent = animal.breed();
        document.querySelector(".parents").textContent = animal.parents();
    } catch (error) {
        log("err:", error.name, error.message)
    }
}

// Пример работы
localStorage.setItem("nfc", JSON.stringify({
    "99:f0:a7:48": {
        "card": {
            "number": "400200",
            "gender": "female",
            "dob": 1654327777,
            "breed": "red and white",
            "parents": [
                200,
                600
            ]
        }
    }
}
))



// Информация о метке
// document.querySelectorAll('.info_update_btn').forEach(el => el.addEventListener('click', () => { work.read()}));
document.querySelectorAll('.info_read_btn').forEach(el => el.addEventListener('click', () => { info_nfc("99:f0:a7:48", data_test) }));
// document.querySelectorAll('.info_record_btn').forEach(el => el.addEventListener('click', () => { work.read()}));


