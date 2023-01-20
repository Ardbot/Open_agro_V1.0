// Информация о животном

// Смотри структуру в animal.json

class Animal {
    constructor(id, data) {
        this.id = id;    // Вненяя функция чтения данных с локальной БД (LS = JSON.parse(localStorage.getItem(key_LS));)
        this.data = data;
    }

    // Возвращает id животного
    get_id() {
        return this.id
    }
    // Переопределяем id животного
    set_id(id) {
        this.id = id
    }

    // Возвращаем данные
    get_data() {
        return this.data
    }
    // Вносим данные для анализа
    set_data(data) {
        this.data = data
    }

    // Номер животного/метки   
    number() {
        var number = this.data[this.id].card.number;
        return number;
    }
    // Пол   
    gender() {
        var gender = this.data[this.id].card.gender;
        return gender;
    }

    // Дата рождения
    dob() {
        var dob = this.data[this.id].card.dob;
        return dob;
    }
    // Порода
    breed() {
        var breed = this.data[this.id].card.breed;
        return breed;
    }
    // Родители
    parents() {
        var parents = this.data[this.id].card.parents;
        return parents;
    }

    // Местоположение
    location() {
        var location = this.data[this.id].zootechnics.location;
        return location;
    }
    // Ветеринария
    veterinarian() {
        var veterinarian = this.data[this.id].veterinarian;
        var work = []
        for (var key in veterinarian) {
            work.push(`${key} (${veterinarian[key]});\n`);
        }
        return work;
    }
    // Половозрастная группа
    age_group() {
        var age_group = this.data[this.id].zootechnics.age_group;
        return age_group;
    }

}