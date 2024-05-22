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

interface MapPostProps {
    id: string;
    polyline?: [number, number][]; // polyline to display on the map
}

// Map component that displays a map with the given polyline (used in the post page)
const MapPost: React.FC<MapPostProps> = ({ id, polyline }) => {
    const mapRef = useRef<L.Map | null>(null); // create a reference to the map
    let map = mapRef.current;
    useEffect(() => {
        map = L.map(id, {
            // create a new map with the given id, center, zoom level and layer
            center: [46.9119382485954, 2.2651793849164115],
            zoom: 6,
            layers: [baseLayer],
        });

        if (!polyline) {
            return;
        }

        // Add polyline to map
        const route = L.polyline(polyline, {
            // create a new polyline with the given points
            color: "blue",
        }).addTo(map);
        map.fitBounds(route.getBounds()); // fit the map to the bounds of this route

        route.on("click", () => {
            // fit the map to the bounds of the route on click
            map?.fitBounds(route.getBounds());
        });

        // Add markers for start and end of the route
        var start = polyline[0]; // first point of the polyline
        var end = polyline[polyline.length - 1]; // last point of the polyline
        L.marker(start, { icon: start_icon }).addTo(map);
        L.marker(end, { icon: end_icon }).addTo(map);

        // Cleanup on unmount (remove the map)
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return <div id={id} />; // return the div that will contain the map
};

export default MapPost;
