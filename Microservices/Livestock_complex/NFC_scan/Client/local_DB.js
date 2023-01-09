// Работает с 1 строкой
class Local_DB {

  constructor(key_LS) {
    this.key_LS = key_LS
  }
  // Чтение
  read() {
    var LS = JSON.parse(localStorage.getItem(this.key_LS));
    // log(LS)
    return LS
  }
  // Запись в память
  write(data) {
    localStorage.setItem(this.key_LS, JSON.stringify(data));
  }
  // Добавить запись
  add_record() {
    log("В разработке")
  }
  // Очистить запись
  clear_record() {
    localStorage.setItem(this.key_LS, '{}');
  }
}

// Обращение к 1 строке в хранилище
db = new Local_DB("Local_Storage")

// Работа с локальной базой данных
// var Local_DB = {

//   // Читаем содержимое памяти по ключу. LS - localStorage
//   read_LS: function (key_LS) {
//     try {
//       var LS = localStorage.getItem(key_LS);

//       if (LS == null) {
//         console.log(key_LS, "Пусто")
//         return "{}"
//       }
//       else if (LS.length > 0) {
//         return JSON.parse(LS);
//       }
//       else {
//         console.log(key_LS, "прочее", LS)
//         return "{}"
//       }
//     }
//     catch (err) {
//       log("Ошибка", err.name, err.message, LS)
//     }
//   },

//   // Записать данные в локальную БД.
//   write_LS: function (key_LS, data_write) {

//     localStorage.setItem(key_LS, JSON.stringify(data_write));
//   },

//   // Очистить запись
//   clear_record: function (key_LS = null) {
//     if (key_LS != null) {
//       log(`Удалить данные ключа "${key_LS}"?`)

//       Local_DB.write_LS(key_LS, '{}')
//     }
//     else {
//       prompt("Укажите ключ для удаления", "key")
//     }
//   },

//   // Очистить всю базу данных
//   clear_db: function () {
//     if (key_LS != null) {
//       log("Удалить данные", key_LS, "?")
//       write_LS(key_LS, '{}')
//     }
//     else {
//       log("Удалить все данные?")
//       localStorage.clear();
//     }
//   }
// }

// db = Local_DB;




// СУБД/DBMS

// class DBMS {

//   constructor() {

//   }
//   // Чтение с лок. БД 
//   read(key_LS) {
//     return Local_DB.read_LS(key_LS);
//   }

//   write(key_LS, data) {
//     var data = Local_DB.read_LS(key_LS);
//     // Если в хранилище пусто
//     if (data == "{}") {
//       localStorage.setItem(key_LS, JSON.stringify(data_write));
//       log(`Данные записаны. ${key_LS}:${data}`)
//     }
//     else {
//       let save = confirm(`Данные в ячейки "${key_LS}" уже существуют!\n Перезаписать?\n old: ${data}\n new: ${data_write}`);
//       if (save) {
//         log("сохранить")
//         localStorage.setItem(key_LS, JSON.stringify(data_write));
//       }
//       else {
//         log("отмена")
//       }
//     }
//   }

// }



// Обрабротка нажатий кнопок БД (выборка классов)
document.querySelectorAll('.read_db_btn').forEach(el => el.addEventListener('click', () => { db.read() }));
document.querySelectorAll('.write_db_btn').forEach(el => el.addEventListener('click', () => { db.write(Date.now()) }));
document.querySelectorAll('.clear_record_btn').forEach(el => el.addEventListener('click', () => { db.clear_record() }));
// document.querySelectorAll('.clear_db_btn').forEach(el => el.addEventListener('click', () => { db.clear_db() }));





function test_db() {

}


// // Добавляем данные в локальную память. key_LS - ключ localStorage
// function add_LS(key_LS, key_id, value_id) {
//   LS = read_list_LS(key_LS)
//   info_nfc_id()
//   if (key_id in LS) {
//     log(`Ключ "${key_id}" уже существует! Значение: ${LS[key_id]}`)
//   }
//   else {
//     LS[key_id] = value_id; // добавим ещё одно свойство
//     localStorage.setItem(key_LS, JSON.stringify(LS)) // обновляем БД
//     log(`Ключ "${key_id}" добавлен. (${LS[key_id]})`)
//   }
// }