// Настройки пользователя

// Добавляем кнопку в блок меню
user = document.createElement("label");

menu.append(user);
// Добавляем кнопку в блок меню
settingsBtn = document.createElement("button");
settingsBtn.classList = "settingsBtn";
settingsBtn.textContent = "Настройки";
menu.append(settingsBtn);

function showHide(element_id) {
    //Если элемент с id-шником element_id существует
    if (document.getElementById(element_id)) {
        //Записываем ссылку на элемент в переменную obj
        var obj = document.getElementById(element_id);
        //Если css-свойство display не block, то: 
        if (obj.style.display != "block") {
            obj.style.display = "block"; //Показываем элемент
        }
        else obj.style.display = "none"; //Скрываем элемент
    }
    //Если элемент с id-шником element_id не найден, то выводим сообщение
    else alert("Элемент с id: " + element_id + " не найден!");
}

// Кнопка настроек
// document.querySelectorAll('.settingsBtn').forEach(el => el.addEventListener('click', () => { showHide("settingsDiv") }));

// Список настроек. Галочки. Цикл

// Вывод содержимого локального хранилища
function forRead_LS() {
    document.createElement('LS');
    createTable("LS")
    headings(["key", "val"]);
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`)

        body([key, localStorage.getItem(key)])
    }
}

document.querySelectorAll('.settingsBtn').forEach(el => el.addEventListener('click', () => { forRead_LS() }));


