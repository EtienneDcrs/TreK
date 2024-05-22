"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

var baseLayer = L.tileLayer(
    // create a new tile layer with OpenStreetMap tiles
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?",
    {
        // add attribution at the bottom right corner of the map
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
);

interface MapProps {
    id: string;
    polylines: [number, number][][]; // array of polylines to display on the map
}

// Map component that displays a map with the given polylines (used in the main page)
const Map: React.FC<MapProps> = ({ id, polylines }) => {
    const mapRef = useRef<L.Map | null>(null); // create a reference to the map
    let map = mapRef.current;
    useEffect(() => {
        map = L.map(id, {
            // create a new map with the given id, center, zoom level and layer
            center: [46.9119382485954, 2.2651793849164115],
            zoom: 5,
            layers: [baseLayer],
        });

        // Add polyline to map
        const routes = [];
        for (let polyline of polylines) {
            // Remove intermediate points to keep only 1000 points not to overload the map
            if (polyline.length > 1000) {
                let new_polyline: [number, number][] = [];
                const step = Math.floor(polyline.length / 1000);
                for (let i = 0; i < polyline.length; i++) {
                    if (i % step == 0) {
                        new_polyline.push(polyline[i]);
                    }
                }
                polyline = new_polyline;
            }

            if (polyline) {
                let route = L.polyline(polyline, {
                    // create a new polyline with the given points
                    color: "blue",
                }).addTo(map); //add the polyline to the map

                route.on("click", () => {
                    // fit the map to the bounds of the route on click
                    map?.fitBounds(route.getBounds());
                });

                routes.push(route); // add the route to the routes array
            }
        }

        // Fit map to bounds of all routes
        if (routes.length > 0) {
            map?.fitBounds(L.featureGroup(routes).getBounds());
        }

        // Cleanup on unmount (remove the map)
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return <div id={id} />; // return the div with the given id to render the map
};

export default Map;
