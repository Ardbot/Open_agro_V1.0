// My position
if (!navigator.geolocation) {
    alert("Устройство не поддерживает геопозицию!")
} else {
}

// Обращаемся к геолокации устройства
function geoPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude
        var long = position.coords.longitude
        var accuracy = position.coords.accuracy
        console.log(lat, long, accuracy)
        return lat, long, accuracy
    },
        error => console.log(error.message),
        { enableHighAccuracy: true })
}


var marker, circle;

// Отрисовка на карте 
function getPosition() {
    log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy

    if (marker) {
        map.removeLayer(marker)
    }
    if (circle) {
        map.removeLayer(circle)
    }

    marker = L.marker([lat, long])
    circle = L.circle([lat, long], { radius: accuracy })

    var featureGroup = L.featureGroup([marker, circle]).addTo(map);
    map.fitBounds = (featureGroup.getBounds())
    return lat, long, accuracy
}

// Ищем элемент с id "user" на странице.
geoPos = document.getElementById('geoPos');
geoBtn = document.createElement("button");
geoBtn.classList = "geoBtn";
geoBtn.textContent = "🧭 Где я?";
geoPos.append(geoBtn);


document.querySelectorAll('.geoBtn').forEach(el => el.addEventListener('click', () => { geoPosition() }));

// Отслеживание местоположения
geoLabel = document.createElement("label");
geoLabel.innerHTML = "🔍 Отслеживать"
checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.classList = "geoCheckbox";
geoLabel.append(checkbox);
geoPos.append(geoLabel);



function geoCheckbox() {
    if (checkbox.checked) {
        log("Навигация включена")
        setInterval(() => {
            geoPosition();
        }, 5000);
    }
    else {
        log("Навигация отключена")
    }
}

document.querySelectorAll('.geoCheckbox').forEach(el => el.addEventListener('click', () => { geoCheckbox() }));