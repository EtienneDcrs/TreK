"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
    id: string;
    polylines: [number, number][][]; // array of polylines to display on the map
}

const Map: React.FC<MapProps> = ({ id, polylines }) => {
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

                if (!mapRef.current) {
                    const map = L.map(id, {
                        // create a new map with the given id, center, zoom level and layer
                        center: [46.9119382485954, 2.2651793849164115],
                        zoom: 5,
                        layers: [baseLayer],
                    });
                    L.control.layers(baseLayers).addTo(map); // add the layers control to the map
                    mapRef.current = map;

                    // Add polyline to map
                    const routes: L.Polyline<any>[] = [];
                    for (let polyline of polylines) {
                        // Remove intermediate points to keep only 1000 points not to overload the map
                        if (polyline.length > 1000) {
                            let new_polyline: [number, number][] = [];
                            const step = Math.floor(polyline.length / 1000);
                            for (let i = 0; i < polyline.length; i++) {
                                if (i % step === 0) {
                                    new_polyline.push(polyline[i]);
                                }
                            }
                            polyline = new_polyline;
                        }

                        if (polyline) {
                            let route = L.polyline(polyline, {
                                // create a new polyline with the given points
                                color: "blue",
                            }).addTo(map); // add the polyline to the map

                            route.on("click", () => {
                                // fit the map to the bounds of the route on click
                                map.fitBounds(route.getBounds());
                            });

                            routes.push(route); // add the route to the routes array
                        }
                    }

                    // Fit map to bounds of all routes
                    if (routes.length > 0) {
                        map.fitBounds(L.featureGroup(routes).getBounds());
                    }
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
    }, [id, polylines]); // Dependency array to trigger effect when id or polylines change

    return <div id={id} />; // return the div with the given id to render the map
};

export default Map;
