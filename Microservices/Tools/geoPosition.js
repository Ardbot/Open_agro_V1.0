// My position
if (!navigator.geolocation) {
    alert("Устройство не поддерживает геопозицию!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition,
            error => log(error.message),
            { enableHighAccuracy: true })
    }, 5000);
}

var marker, circle;

function getPosition(position) {
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

