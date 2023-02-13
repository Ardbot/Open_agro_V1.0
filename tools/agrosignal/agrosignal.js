// Запросы к "Агросигнал" из браузера.

// let apiKey = "xxx-xxx-xxx-xxxx"
// let apiKey = localStorage.getItem('apiKey').slice(1, -1)    // Берём из локального хранилища (Небезопасно. Использовать куки) 




// Список транспортных средств
async function getVehicles() {
    try {
        // console.log("dwa");
        let url = 'https://gis.agrosignal.com/units?apiKey=' + apiKey; 
        // let url = 'https://example.com'; 
        let response = await fetch(url,{
            method: 'GET',    
            withCredentials: true,    
            crossorigin: true,    
            mode: 'no-cors',
        });
        // let data = await response.json(); // читаем ответ в формате JSON
        // console.log(data);
        console.log(response.json);
        // alert(data[0].author.login);
    }
    catch (err) {
        console.log("Err:", err);
    }

}

document.querySelectorAll('.listAuto').forEach(el => el.addEventListener('click', () => { getVehicles() }));