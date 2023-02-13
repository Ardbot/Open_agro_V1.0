// Запросы к "Агросигнал" из браузера.

// let apiKey = "xxx-xxx-xxx-xxxx"
// let apiKey = localStorage.getItem('apiKey').slice(1, -1)    // Берём из локального хранилища (Небезопасно. Использовать куки) 




// Список транспортных средств
async function getVehicles() {
    console.log("dwa");
    let url = 'https://gis.agrosignal.com/units?apiKey=' + apiKey;
    let response = await fetch(url);
    let data = await response.json(); // читаем ответ в формате JSON
    console.log(data);
    // alert(data[0].author.login);

}

// document.querySelectorAll('.listTS').forEach(el => el.addEventListener('click', () => { getVehicles() }));