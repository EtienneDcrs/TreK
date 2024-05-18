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

const start_icon = L.icon({
    iconUrl: "/pins/pin-icon-start.png",
    iconSize: [33, 45],
    iconAnchor: [16, 45],
    shadowUrl: "/pins/pin-shadow.png",
    shadowSize: [50, 50],
    shadowAnchor: [16, 47],
});
const end_icon = L.icon({
    iconUrl: "/pins/pin-icon-end.png",
    iconSize: [33, 45],
    iconAnchor: [16, 45],
    shadowUrl: "/pins/pin-shadow.png",
    shadowSize: [50, 50],
    shadowAnchor: [16, 47],
});

interface MapPostProps {
    id: string;
    polyline?: [number, number][];
}

const MapPost: React.FC<MapPostProps> = ({ id, polyline }) => {
    const mapRef = useRef<L.Map | null>(null);
    let map = mapRef.current;
    useEffect(() => {
        map = L.map(id, {
            center: [46.9119382485954, 2.2651793849164115],
            zoom: 6,
            layers: [baseLayer],
        });
        console.log(polyline);
        // Add polyline to map
        if (!polyline) {
            return;
        }
        const route = L.polyline(polyline, {
            color: "blue",
        }).addTo(map); // afficher la route sur la carte
        map.fitBounds(route.getBounds());

        route.on("click", () => {
            map?.fitBounds(route.getBounds());
        });
        //Ajoute les markers
        var start = polyline[0];
        var end = polyline[polyline.length - 1];
        const start_marker = L.marker(start, { icon: start_icon }).addTo(map);
        const end_marker = L.marker(end, { icon: end_icon }).addTo(map);

        // Cleanup on unmount
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return <div id={id} />;
};

export default MapPost;
