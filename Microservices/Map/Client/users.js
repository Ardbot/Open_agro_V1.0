// Информация о пользователе

// Уникальный номер пользователя  
userId = new Local_DB("userId");
userId.write(100);   // Единоразово для отладки

function getUserId() {
    id = userId.read();
    return id; 
}

