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

const MapComponent: React.FC<MapProps> = ({ id, polylines }) => {
    const mapRef = useRef<L.Map | null>(null);
    let map = mapRef.current;
    useEffect(() => {
        map = L.map(id, {
            center: [46.9119382485954, 2.2651793849164115],
            zoom: 6,
            layers: [baseLayer],
        });
        // Add polyline to map
        const routes = [];
        for (let polyline of polylines) {
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

        // //Ajoute les markers
        // var start = polyline[0];
        // var end = polyline[polyline.length - 1];
        // const start_marker = L.marker(start, { icon: start_icon }).addTo(map);
        // const end_marker = L.marker(end, { icon: end_icon }).addTo(map);

        // Cleanup on unmount
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return <div id={id} />;
};

export default MapComponent;
