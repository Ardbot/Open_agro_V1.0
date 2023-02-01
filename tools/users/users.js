// Информация о пользователе

// // Уникальный номер пользователя  
// userId = new Local_DB("userId");
// userId.write(100);   // Единоразово для отладки

// function getUserId() {
//     id = userId.read();
//     return id; 
// }


// Ищем элемент с id "user" на странице.
user = document.getElementById('user');
// Добавляем имя пользователя в блок меню
userName = document.createElement("label");
userName.innerHTML = "userId"
user.append(userName);