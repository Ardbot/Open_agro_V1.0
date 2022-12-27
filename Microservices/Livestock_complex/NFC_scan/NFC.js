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
      log(`> Номер: ${serialNumber}`);
      log(`> Запись: (${message.records.length})`);
      localStorage.setItem(123, message.records.length)

      add_option(serialNumber)
      localStorage.setItem(key, value)
    });
  } catch (error) {
    log("Ошибка! " + error);
  }
};


// Запись в локальное хранилищe
localStorage.setItem('nfc_id', JSON.stringify({ "89:16:255:217": "текст 1 метки", "89:16:255:218": "текст 2 метки", "89:16:255:219": "текст 3 метки", "89:16:255:220": "текст 4 метки" }))

// Запрос к локальному хранилищу
// data = localStorage.getItem(key)

// Добавляем в список (list) элемент(opt)
function add_option(list = 'nfc_id', opt) {
  var option = document.createElement("option");
  option.value = opt;
  option.text = opt;
  document.getElementById(list).appendChild(option);

}

// |добавляем адрес в локальную память
function add_id_LS(key, value) {
  // nfc_id =  { "89:16:255:217": "текст 1 метки", "89:16:255:218": "текст 2 метки", "89:16:255:219": "текст 3 метки", "89:16:255:220": "текст 4 метки" } 

  // Читаем содержимое памяти по ключу
  nfc_id = JSON.parse(localStorage.getItem(key));
  // log(nfc_id)
  i = 0;
  for (key in nfc_id) {
    i++;
    log(i, ')', key, ':', nfc_id[key])
  }
}





