console.log("Script chargé !");

// for more layers, see https://leaflet-extras.github.io/leaflet-providers/preview/
// Here are few layers

var baseLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
);

var map = L.map("post-map", {
    center: [46.9119382485954, 2.2651793849164115],
    zoom: 6,
    layers: [baseLayer],
});
