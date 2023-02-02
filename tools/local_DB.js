// Works with 1 line in the browser
class Local_DB {

  constructor(key_LS) {
    this.key_LS = key_LS
  }

  setKeyLS(newName) {
    this.key_LS = newName;
    console.log(this.key_LS)
  }

  // Reading
  read() {
    var LS = JSON.parse(localStorage.getItem(this.key_LS));
    // log(LS)
    return LS
  }
  // Memory write
  write(data) {
    localStorage.setItem(this.key_LS, JSON.stringify(data));
  }
  // Add a note
  add_record() {
    log("В разработке")
  }
  // Clear entry
  clear_record() {
    localStorage.setItem(this.key_LS, '{}');
  }
}

// Accessing the string "Local_Storage" in storage
db = new Local_DB("Local_Storage")

// Элемент для занесения ключа
DivLS = document.getElementById('DivLS');
trDiv = document.createElement('DivLS');
trDiv.classList = "tr"  // tr - table row
DivLS.append(trDiv);

keyInput = document.createElement('input');
keyInput.placeholder = "key";
valInput = document.createElement('input');
valInput.placeholder = "value";


writeLSbtn = document.createElement('button');
writeLSbtn.classList = "writeLSbtn"
writeLSbtn.textContent = "Сохранить"
trDiv.append(keyInput, valInput, writeLSbtn);

function setData() {
  key = keyInput.value
  if (key == "") {
    alert("key: пусто!");
  }
  else {
    db.setKeyLS(key);
  }

  val = valInput.value
  if (val == "") {
    alert("val: пусто!")
  }
  else {
    db.write(val);
  }

  alert(db.read())



}

document.querySelectorAll('.writeLSbtn').forEach(el => el.addEventListener('click', () => { setData() }));

// bodyDiv = document.createElement('button');

// keyInactive = document.createElement('label');
// keyInactive.innerText = "key";

// key = document.createElement('input');
// key.placeholder = "key"

// val = document.createElement('input');
// val.placeholder = "value";

// {/* <label>Click me <input type="text"></label> */}


// addBtn = document.createElement('button');
// addBtn.textContent = "Сохранить"

// delBtn = document.createElement('button');
// delBtn.textContent = "Удалить запись"

// DivLS.append(keyInactive);
// DivLS.append(val);
// DivLS.append(addBtn);
// DivLS.append(delBtn);


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