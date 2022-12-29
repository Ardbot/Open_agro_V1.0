// Работа с NFC метками

// Библиотека
var ChromeSamples = {
  log: function () {
    var line = Array.prototype.slice.call(arguments).map(function (argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#log').textContent += line + '\n';
  },

  terminal: function () {
    var line = Array.prototype.slice.call(arguments).map(function (argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#container').textContent += line + '\n';
  },

  clearLog: function () {
    document.querySelector('#log').textContent = '';
  },

  setStatus: function (status) {
    document.querySelector('#status').textContent = status;
  },

  setContent: function (newContent) {
    var content = document.querySelector('#content');
    while (content.hasChildNodes()) {
      content.removeChild(content.lastChild);
    }
    content.appendChild(newContent);
  }
};

if (!("NDEFReader" in window))
  ChromeSamples.setStatus("Веб-NFC недоступен.");


log = ChromeSamples.log;

// Очистить вывод
function clearlogs() {
  ChromeSamples.clearLog()
}

// Очистить базу данных
function clear_db() {
  localStorage.clear();
}


// Сканирование
async function start_scan() {
  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    ChromeSamples.setStatus("Сканирование запущено");
    document.getElementById('scan_btn').disabled = true;

    ndef.addEventListener("readingerror", () => {
      log("Не удается прочитать данные из метки NFC. Попробуйте еще раз");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      // log(`> Номер: ${serialNumber}`);
      log(`> Запись: (${message.records})`);
      // localStorage.setItem(123, message.records.length)
      add_LS('nfc_id', serialNumber, message.records.length)
      // add_option("list_id", serialNumber)
    });
  } catch (error) {
    log("Ошибка! " + error);
  }
};

// Блок NFC
function info_nfc_id() {
  document.getElementById('nfc_id').innerHTML='123456'
}

// Запись в локальное хранилищe
localStorage.setItem('nfc_id', JSON.stringify({ "89:16:255:217": "текст 1 метки", "89:16:255:218": "текст 2 метки", "89:16:255:219": "текст 3 метки", "89:16:255:220": "текст 4 метки" }))

// Запрос к локальному хранилищу
// data = localStorage.getItem(key)

// Список работы с сервера
localStorage.setItem('list_work', JSON.stringify({ "99:f0:a7:48": "Бруцеллез. Протокол 2", "89:16:255:218": "текст 2 метки", "89:16:255:219": "текст 3 метки" }));

// Обновление списка меток 
function Refresh(key_LS, list_id) {
  data = read_list_LS(key_LS)
  document.getElementById(list_id).innerHTML = ''; // Очищаем список
  for (var key in data) {
    add_option(list_id, key, data[key])
  }
}

// Добавляем в список (list) элемент(opt)
function add_option(list, val, txt = val) {
  var option = document.createElement("option");
  option.value = val;
  option.text = txt;
  document.getElementById(list).appendChild(option);
}

// Читаем содержимое памяти по ключу. LS - localStorage
function read_list_LS(key_LS) {
  LS = JSON.parse(localStorage.getItem(key_LS));
  if (LS == null) {
    LS = {}
  }
  return LS
}

// |добавляем адрес в локальную память. key_LC - ключ localStorage, key - id метки, value - значение метки.
function add_LS(key_LS, key_id, value_id) {
  LS = read_list_LS(key_LS)
  info_nfc_id()
  if (key_id in LS) {
    log(`Ключ "${key_id}" уже существует! Значение: ${LS[key_id]}`)
  }
  else {
    LS[key_id] = value_id; // добавим ещё одно свойство
    localStorage.setItem(key_LS, JSON.stringify(LS)) // обновляем БД
    log(`Ключ "${key_id}" добавлен. (${LS[key_id]})`)
  }
}