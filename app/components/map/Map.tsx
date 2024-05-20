"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
var baseLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
);

interface MapProps {
    id: string;
    polylines: [number, number][][];
}

const Map: React.FC<MapProps> = ({ id, polylines }) => {
    const mapRef = useRef<L.Map | null>(null);
    let map = mapRef.current;
    useEffect(() => {
        map = L.map(id, {
            center: [46.9119382485954, 2.2651793849164115],
            zoom: 5,
            layers: [baseLayer],
        });
        // Add polyline to map
        const routes = [];

        for (let polyline of polylines) {
            if (polyline.length > 1000) {
                // supprime les points intermédiaires pour ne garder que 1000 points
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
                    color: "blue",
                }).addTo(map); // afficher la route sur la carte
                route.on("click", () => {
                    map?.fitBounds(route.getBounds());
                });
                routes.push(route);
            }
        }
        // Fit map to bounds of all routes
        if (routes.length > 0) {
            map?.fitBounds(L.featureGroup(routes).getBounds());
        }
        // Cleanup on unmount
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return <div id={id} />;
};

export default Map;
