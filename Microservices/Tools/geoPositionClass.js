// Модуль навигации

export var  lat = 50;
var long = 128;
export var accuracy = 200;

// Возвращает долготу, широту и точность
export function getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        long = position.coords.longitude
        accuracy = position.coords.accuracy
        console.log(lat, long, accuracy)
        return lat, long, accuracy
    },
        error => log(error.message),
        { enableHighAccuracy: true })
}

console.log("glob", lat, long, accuracy)

// Устанавливает маркер на карту
function setMarker(lat = this.lat, long = this.long) {
    // var marker = L.marker([lat, long])
    var marker = L.marker([50, 128])
    // var featureGroup = L.featureGroup([marker]).addTo(map);
    console.log("ok")
}

// geo = GeoPosition();
// geo.getPosition();
// console.log(geo.lat)
// console.log(geo.long)
// console.log(geo.accuracy)
// // geo.setMarker();
// geo.setMarker(50, 128.01);