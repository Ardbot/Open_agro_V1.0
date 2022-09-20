$("#test").on("click", function () {
var latLon = L.latLng(50.253313,127.8073497);
var bounds = latLon.toBounds(5000); // 500 = metres
map.panTo(latLon).fitBounds(bounds);
})