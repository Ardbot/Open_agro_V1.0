// Работа с NFC метками


// Асинхронный запрос к API.
async function request_api(method, url, body = null) {
  // Отправляем запрос
  const response = await fetch(url, {
    method: method,
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: body // body: JSON.stringify(body) 
  });
  //  Если сервер ответил 200-299
  if (response.ok) {
    const data = await response.json();
    if (data == null) {
      log("Пустой ответ")
    }
    return data
  }
  //  Если ошибка сервера
  else {
    log('Ошибка', response.status)
    return {}
  }
}

function downloads_work() {
  request_api('GET', '/api/nfc')
    .then(result => log(result))
}

// Библиотека
var ChromeSamples = {
  terminal: function () {
    var line = Array.prototype.slice.call(arguments).map(function (argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#container').textContent += line + '\n';
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




// Обработка данных с NFC метки



// Получить задания
function get_work() {
  data = work.read();
  log(data);
  i = 0;
  document.getElementById('list_work').innerHTML = '';
  for (var key in data) {
    i++;
    var work_stroke = document.createElement("tr");
    an = new Animal("99:f0:a7:48");
    var data = work.read();
    an.set_data(data)
    work_stroke.innerHTML = `<td>${an.number()}</td><td>${an.location()}</td><td>${an.veterinarian()}</td>`;


    document.getElementById('list_work').appendChild(work_stroke);
    // log(`${i}) ${key}: ${JSON.stringify(data[key])}`);
  }


  function createTable() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    document.getElementById('body').appendChild(table);
  }

  // document.getElementById('list_work').innerHTML = data[0]
}


async function write_nrf(data = 'no_data') {
  const ndef = new NDEFReader();
  log("Режим записи")
  ndef.write(
    data
  ).then(() => {
    log("Сообщение записано.");
  }).catch(error => {
    log(`Ошибка записи: ${error}.`);
  });
}

// read_nfc() {

// }


function decode_nfc() {
  // const ndef = new NDEFReader();
  // const encoder = new TextEncoder();
  // await ndef.write({ records: [
  //   {
  //     recordType: "smart-poster",  // Sp
  //     data: { records: [
  //       {
  //         recordType: "url",  // URL record for the Sp content
  //         data: "https://my.org/content/19911"
  //       },
  //       {
  //         recordType: "text",  // title record for the Sp content
  //         data: "Funny dance"
  //       },
  //       {
  //         recordType: ":t",  // type record, a local type to Sp
  //         data: encoder.encode("image/gif") // MIME type of the Sp content
  //       },
  //       {
  //         recordType: ":s",  // size record, a local type to Sp
  //         data: new Uint32Array([4096]) // byte size of Sp content
  //       },
  //       {
  //         recordType: ":act",  // action record, a local type to Sp
  //         // do the action, in this case open in the browser
  //         data: new Uint8Array([0])
  //       },
  //       {
  //         recordType: "mime", // icon record, a MIME type record
  //         mediaType: "image/png",
  //         data: await (await fetch("icon1.png")).arrayBuffer()
  //       },
  //       {
  //         recordType: "mime", // another icon record
  //         mediaType: "image/jpg",
  //         data: await (await fetch("icon2.jpg")).arrayBuffer()
  //       }
  //     ]}
  //   }
  // ]});

  // update_class(".nfc_id", 55)
}

// Обновить все значение в классе
function update_class(selector, funct) {
  data = document.querySelectorAll(selector);
  // data.innerHTML = "123";
  for (let i = 0; i < data.length; i++) {
    data[i].innerHTML = funct
  }
}

// Блок NFC
function info_nfc_id() {
  document.getElementById('nfc_id').innerHTML = '123456'
}

// Запись в локальное хранилищe
localStorage.setItem('nfc_id', JSON.stringify({ "89:16:255:217": "текст 1 метки", "89:16:255:218": "текст 2 метки", "89:16:255:219": "текст 3 метки", "89:16:255:220": "текст 4 метки" }))

// Запрос к локальному хранилищу
// data = localStorage.getItem(key)

// DB 
localStorage.setItem('Animals', '{"99:f0:a7:48": {"card": {"number": "100500","gender":"female","dob": 1654329940,"breed": "red and white","parents": [100,500]},"veterinarian": [{"Вакцинация":"Протокол 1"},{"Вакцинация":"Протокол 2"}],"zootechnics":{"age_group":"Нетель","location":"Родилка"}},"nfc_id2": {}}')
localStorage.setItem('key', '{"99:f0:a7:48": {"card": {"number": "100500","gender":"female","dob": 1654329940,"breed": "red and white","parents": [100,500]},"veterinarian": [{"Вакцинация":"Протокол 1"},{"Вакцинация":"Протокол 2"}],"zootechnics":{"age_group":"Нетель","location":"Родилка"}}}')

// Список работы с сервера
localStorage.setItem('list_work', JSON.stringify({ "99:f0:a7:48": "Вакцинация. Протокол 2", "89:16:255:218": { "Лечение": "Мастит. Протокол 1" }, "89:16:255:219": "Осмотр", "89:16:255:220": "Убой" }));



// Обновление списка меток 
function Refresh(list_id) {
  data = work.read();
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



