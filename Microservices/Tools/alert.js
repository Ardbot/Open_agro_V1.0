// Всплывающее уведомление

function msg(data="Сообщение!", time=2000){
    let div = document.createElement('div');
div.className = "alert";
div.innerHTML = data;
document.body.append(div);
setTimeout(() => div.remove(), time);
}


