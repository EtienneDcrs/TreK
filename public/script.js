console.log("Script chargé !");

// for more layers, see https://leaflet-extras.github.io/leaflet-providers/preview/
// Here are few layers

var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?',
{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
  attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}', {
  minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var GeoportailFrance_plan = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
  attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 18,
	apikey: 'choisirgeoportail',
	format: 'image/png',
	style: 'normal'
});
var GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
  attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	apikey: 'choisirgeoportail',
	format: 'image/jpeg',
	style: 'normal'
});
var WaymarkedTrails_hiking = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
  maxZoom: 18,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var map = L.map('map', {
  center: [46.9119382485954,2.2651793849164115],
  zoom: 6,
  layers: [baseLayer]
  
});
var baseLayers = {
  "Base Layer": baseLayer,
  "Layer France": OpenStreetMap_France,
  "Stadia Alidade Satellite": Stadia_AlidadeSatellite,
  "OpenTopoMap": OpenTopoMap,
  "Stadia Outdoors": Stadia_Outdoors,
  "Esri World Imagery": Esri_WorldImagery,
  "Geoportail France Plan": GeoportailFrance_plan,
  "Geoportail France Orthos": GeoportailFrance_orthos,
  //"Waymarked Trails Hiking": WaymarkedTrails_hiking
};
L.control.layers(baseLayers).addTo(map);


var start_icon = L.icon({
  iconUrl: '/pins/pin-icon-start.png',
  iconSize: [33, 45],
  iconAnchor: [16, 45],
  shadowUrl: '/pins/pin-shadow.png',
  shadowSize: [50, 50],
  shadowAnchor: [16, 47],
});
var end_icon = L.icon({
  iconUrl: '/pins/pin-icon-end.png',
  iconSize: [33, 45],
  iconAnchor: [16, 45],
  shadowUrl: '/pins/pin-shadow.png',
  shadowSize: [50, 50],
  shadowAnchor: [16, 47],
});
// for more icons, see https://www.flaticon.com


class Route {
  constructor(name, line, coords, line_coords){
    this.name = name;
    this.line = line;
    this.coords = coords;
    this.line_coords = line_coords;
  }
}

// Récupérer l'élément input
var fileInput = document.getElementById('fileInput');
var routes = [];
var active_route;
var route_layer;
var start_marker;
var end_marker;
// Ajouter un écouteur d'événement sur le changement de fichier
fileInput.addEventListener('change', function(event) {
  var file = event.target.files[0]; // Obtenir le fichier sélectionné
  var extension = file.name.split('.').pop(); // Obtenir l'extension du fichier
  if (extension === 'kml') {
    console.log("Fichier KML");
  } else if (extension === 'gpx') {
    console.log("Fichier GPX");
  }
  if (file) {
    
    var reader = new FileReader(); // Créer un nouvel objet FileReader
    
    // Définir une fonction à exécuter lorsque la lecture du fichier est terminée
    reader.onload = function(e) {
      var contents = e.target.result; // Contenu du fichier
      var route_coords = getCoordsFromFile(extension, contents); // Obtenir les coordonnées de la route
      var route_line_coords = createRoute(route_coords); // Créer la route
      route_layer = L.polyline(route_line_coords, {color: 'blue'}).addTo(map); // afficher la route sur la carte
      var route = new Route(file.name, route_layer, route_coords, route_line_coords);
      route.line.on('click', onPolylineClick); // Associer l'événement "click" à la polyline
      
      routes.push(route);
      updateRoute(route);
    };
    
    // Lire le contenu du fichier en tant que texte
    reader.readAsText(file);
  }
});

function resetZoomMap(){
    map.setView([46.4355335569293, 2.6312420210409315], 6);
};

function resetZoomRoute(){
    map.fitBounds(active_route.line.getBounds());
}


function getCoordsFromFile(file_type, contents){
  var coords = {lat: [], lon: [], ele: []}
  var match;
  if (file_type === 'kml') {
    var lineStringRegex = /<LineString>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>[\s\S]*?<\/LineString>/g;
    var coordinatesRegex = /([\d\.-]+),([\d\.-]+),([\d\.-]+)/g;
    var lineStringContent = '';
    while ((match = lineStringRegex.exec(contents)) !== null) {
        lineStringContent += match[1]; // Le contenu entre les balises coordinates
    }
    while ((match = coordinatesRegex.exec(lineStringContent)) !== null) {
      coords.lat.push(parseFloat(match[2]));
      coords.lon.push(parseFloat(match[1]));
      coords.ele.push(parseFloat(match[3]));
    }


  } else if (file_type === 'gpx') {
    var trksegRegex = /<trkseg>([\s\S]*?)<\/trkseg>/g;
    var trkptRegex = /<trkpt lat="([\d\.-]+)" lon="([\d\.-]+)">[\s\S]*?<ele>([\d\.-]+)<\/ele>[\s\S]*?<\/trkpt>/g;
    var trksegContent = '';
    while ((match = trksegRegex.exec(contents)) !== null) {
      trksegContent += match[1]; // Le contenu entre les balises trkseg
    }
    while ((match = trkptRegex.exec(trksegContent)) !== null) {
      coords.lat.push(parseFloat(match[1]));
      coords.lon.push(parseFloat(match[2]));
      coords.ele.push(parseFloat(match[3]));
    }
  }
  return coords;
}

function createRoute(route_coords){
  // si route_coords est de la forme {lat: [], lon: [], ele: []}, on traite les données
  if (route_coords.lat.length === 0) {
    console.error("Aucune coordonnée trouvée !");
    return;
  } else{

    var route_line_coords = [];
    for (var i = 0; i < route_coords.lat.length; i++) {
      route_line_coords.push([route_coords.lat[i], route_coords.lon[i]]);
    }
    return route_line_coords;
  }
}

function getRouteLength(coords){

  function deg2rad(deg){
    return deg * (Math.PI / 180);
  }
  function distance(lat1, lon1, lat2, lon2){
    var R = 6371; // Rayon de la Terre en km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance en km
    return d;
  }

  var length = 0;
  for (var i = 1; i < coords.lat.length; i++) {
    var lat1 = coords.lat[i - 1];
    var lon1 = coords.lon[i - 1];
    var lat2 = coords.lat[i];
    var lon2 = coords.lon[i];
    var d = distance(lat1, lon1, lat2, lon2);
    length += d;
  }
  return length;
}

function getRouteElevation(coords){
  var start = coords.ele[0];
  var end = coords.ele[coords.ele.length - 1];
  var diff = end - start;
  return diff;
}

function getRouteElevationGain(coords){
  var gain = 0;
  for (var i = 1; i < coords.ele.length; i++) {
    var ele1 = coords.ele[i - 1];
    var ele2 = coords.ele[i];
    var diff = ele2 - ele1;
    if (diff > 0) {
      gain += diff;
    }
  }
  return gain;
}

function deleteRoute(route){
  
  var polyline_to_remove = map._layers[route.line._leaflet_id];
  map.removeLayer(polyline_to_remove);
  hideMarkers();
  
  document.getElementById('route_btn').style.display = 'none';
  document.getElementById('delete_route').style.display = 'none';
  document.getElementById('route-info-content-elevation-gain').innerHTML = "Dénivelé positif : ";
  document.getElementById('route-info-content-distance').innerHTML = "Distance : ";
  document.getElementById('route-info-content-elevation').innerHTML = "Dénivelé (Départ - Arrivée) : ";
  document.getElementById('route-info-content-elevation-gain').innerHTML = "Dénivelé positif : ";
}


function onPolylineClick(e) {
  var route = routes.find(route => route.coords.lat[0] === e.target._latlngs[0].lat); // Trouver la route correspondante
  console.log(route);
  updateRoute(route);
}

// Associer l'événement "click" à la polyline

function updateRoute(route){
  if (typeof route === "object"){
    if (typeof active_route === "object"){
      
      //map.removeLayer(active_route.line);
      hideMarkers();
    }
    
    active_route = route;
    //active_route.line = L.polyline(active_route.line_coords, {color: 'blue'}).addTo(map);
    active_route.line.on('click', onPolylineClick);
    map.fitBounds(active_route.line.getBounds());
    showMarkers(active_route);
    
    document.getElementById('route_btn').style.display = 'block'; // Afficher le bouton de zoom sur la route
    document.getElementById('delete_route').style.display = 'block';
    document.getElementById('route-info-content-distance').innerHTML = "Distance : "+getRouteLength(active_route.coords).toFixed(2) + ' km';
    document.getElementById('route-info-content-elevation').innerHTML = "Dénivelé (Départ - Arrivée) : "+getRouteElevation(active_route.coords).toFixed(2) + ' m';
    document.getElementById('route-info-content-elevation-gain').innerHTML = "Dénivelé positif : "+getRouteElevationGain(active_route.coords).toFixed(2) + ' m';
    
  }
  else{
    console.error("La route n'est pas valide", typeof route);
  }
}

function showMarkers(route){
  var start = route.line_coords[0];
  var end = route.line_coords[route.line_coords.length - 1];
  start_marker = L.marker(start, {icon: start_icon}).addTo(map);
  end_marker = L.marker(end, {icon: end_icon}).addTo(map);
}

function hideMarkers(){
  console.log("hideMarkers");
  map.removeLayer(start_marker);
  map.removeLayer(end_marker);
}
