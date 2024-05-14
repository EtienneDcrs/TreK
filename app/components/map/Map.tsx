'use client';

import L, { LatLngExpression, LatLngBounds } from "leaflet";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importer les styles CSS de Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import MapScript from './script.js'

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src
});


const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?',
{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
/*const Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
    attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'jpg'
});*/
const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
/*const Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});*/
const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
/*const GeoportailFrance_plan = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
    attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 18,
	apikey: 'choisirgeoportail',
	format: 'image/png',
	style: 'normal'
});
const GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
    attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	apikey: 'choisirgeoportail',
	format: 'image/jpeg',
	style: 'normal'
});*/
const WaymarkedTrails_hiking = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
    maxZoom: 18,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


const baseLayers = {
    "Base Layer": baseLayer,
    "Layer France": OpenStreetMap_France,
    //"Stadia Alidade Satellite": Stadia_AlidadeSatellite,
    "OpenTopoMap": OpenTopoMap,
    //"Stadia Outdoors": Stadia_Outdoors,
    "Esri World Imagery": Esri_WorldImagery,
    //"Geoportail France Plan": GeoportailFrance_plan,
    //"Geoportail France Orthos": GeoportailFrance_orthos,
    //"Waymarked Trails Hiking": WaymarkedTrails_hiking
};
const allLayers = [baseLayer, OpenStreetMap_France,OpenTopoMap]

interface MapProps {
    center?: [number,number];
    className?: string;
    polyline?: [number, number][];
};

const Map: React.FC<MapProps> = ({ center, className, polyline }) => {
    /*const defaultPosition :[number,number]= [46.9119382485954, 2.2651793849164115];
    var mapCenter = defaultPosition as LatLngExpression;
    // Fonction pour calculer le centre de la Polyline
    const calculatePolylineCenter = (polyline: [number,number][]):[number,number] => {
        console.log("Calculating center of polyline");
        if (!polyline || polyline.length == 0) return defaultPosition;

        let minLat = Infinity;
        let minLng = Infinity;
        let maxLat = -Infinity;
        let maxLng = -Infinity;

        // Parcourir les coordonnées pour trouver les valeurs min et max
        polyline.forEach((coords: [number,number]) => {
            console.log("Coords", coords);
            if (coords[0]){
                minLat = Math.min(minLat, coords[0]);
                minLng = Math.min(minLng, coords[1]);
                maxLat = Math.max(maxLat, coords[0]);
                maxLng = Math.max(maxLng, coords[1]);
            };
        });
        console.log("Center of polyline", [(minLat + maxLat) / 2, (minLng + maxLng) / 2]);
        return [(minLat + maxLat) / 2, (minLng + maxLng) / 2];  
    };

    mapCenter = defaultPosition as LatLngExpression;
    // Déterminer le centre à utiliser pour la carte
    if (polyline){
        mapCenter = calculatePolylineCenter(polyline) as LatLngExpression;
    } else if (center){
        mapCenter = center as LatLngExpression;
    }

    console.log("Map center", mapCenter);
    return (
        <MapContainer className={`${className ? className : "leaflet-map"}`} center={mapCenter} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {polyline && (
                <Polyline pathOptions={{ color: 'blue' }} positions={polyline} />
            )}
        </MapContainer>
    );*/
    return(
        <div className="h-full">
            <div id="map" use-global-leaflet="true"></div>
            {/* <div className="leaflet-map" use-global-leaflet="true"></div> */}
        </div>
    );
};

export default Map;