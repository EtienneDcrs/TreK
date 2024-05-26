"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface MapPostProps {
    id: string;
    polyline?: [number, number][]; // polyline to display on the map
}

const MapPost: React.FC<MapPostProps> = ({ id, polyline }) => {
    const mapRef = useRef<L.Map | null>(null); // create a reference to the map

    useEffect(() => {
        // Check if we're in the browser environment before accessing the window object
        if (typeof window !== "undefined") {
            import("leaflet").then((L) => {
                const baseLayer = L.tileLayer(
                    // create a new tile layer with OpenStreetMap tiles
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?",
                    {
                        // add attribution at the bottom right corner of the map
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }
                );
                var OpenStreetMap_France = L.tileLayer(
                    "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
                    {
                        attribution:
                            '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }
                );
                var Stadia_AlidadeSatellite = L.tileLayer(
                    "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
                    {
                        attribution:
                            '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        //ext: "jpg",
                    }
                );
                var OpenTopoMap = L.tileLayer(
                    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                    {
                        //maxZoom: 17,
                        attribution:
                            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                    }
                );
                var Stadia_Outdoors = L.tileLayer(
                    "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}",
                    {
                        minZoom: 0,
                        maxZoom: 20,
                        attribution:
                            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        //ext: "png",
                    }
                );
                var Esri_WorldImagery = L.tileLayer(
                    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    {
                        attribution:
                            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
                    }
                );
                var GeoportailFrance_plan = L.tileLayer(
                    "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
                    {
                        attribution:
                            '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
                        bounds: [
                            [-75, -180],
                            [81, 180],
                        ],
                        minZoom: 2,
                        maxZoom: 18,
                        //apikey: "choisirgeoportail",
                        //format: "image/png",
                        //style: "normal",
                    }
                );
                var GeoportailFrance_orthos = L.tileLayer(
                    "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
                    {
                        attribution:
                            '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
                        bounds: [
                            [-75, -180],
                            [81, 180],
                        ],
                        //apikey: "choisirgeoportail",
                        //format: "image/jpeg",
                        //style: "normal",
                    }
                );

                const baseLayers = {
                    "Base Layer": baseLayer,
                    "Layer France": OpenStreetMap_France,
                    "Stadia Alidade Satellite": Stadia_AlidadeSatellite,
                    OpenTopoMap: OpenTopoMap,
                    "Stadia Outdoors": Stadia_Outdoors,
                    "Esri World Imagery": Esri_WorldImagery,
                    "Geoportail France Plan": GeoportailFrance_plan,
                    "Geoportail France Orthos": GeoportailFrance_orthos,
                };
                const start_icon = L.icon({
                    // create a new icon for the start marker
                    iconUrl: "/pins/pin-icon-start.png",
                    iconSize: [33, 45],
                    iconAnchor: [16, 45],
                    shadowUrl: "/pins/pin-shadow.png",
                    shadowSize: [50, 50],
                    shadowAnchor: [16, 47],
                });
                const end_icon = L.icon({
                    // create a new icon for the end marker
                    iconUrl: "/pins/pin-icon-end.png",
                    iconSize: [33, 45],
                    iconAnchor: [16, 45],
                    shadowUrl: "/pins/pin-shadow.png",
                    shadowSize: [50, 50],
                    shadowAnchor: [16, 47],
                });

                if (!mapRef.current) {
                    const map = L.map(id, {
                        center: [46.9119382485954, 2.2651793849164115],
                        zoom: 6,
                        layers: [baseLayer],
                    });
                    L.control.layers(baseLayers).addTo(map);
                    mapRef.current = map;

                    if (!polyline) {
                        return;
                    }

                    const route = L.polyline(polyline, {
                        color: "blue",
                    }).addTo(map);
                    map.fitBounds(route.getBounds());

                    route.on("click", () => {
                        map.fitBounds(route.getBounds());
                    });

                    const start = polyline[0]; // first point of the polyline
                    const end = polyline[polyline.length - 1]; // last point of the polyline
                    L.marker(start, { icon: start_icon }).addTo(map);
                    L.marker(end, { icon: end_icon }).addTo(map);
                }

                // Cleanup on unmount (remove the map)
                return () => {
                    if (mapRef.current) {
                        mapRef.current.remove();
                        mapRef.current = null;
                    }
                };
            });
        }
    }, [id, polyline]); // Dependency array to trigger effect when id or polyline change

    return <div id={id} />; // return the div that will contain the map
};

export default MapPost;
