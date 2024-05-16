"use client";

import { useState } from "react";
import FileInput from "./inputs/FileInput";
import Map from "./map/Map";

const PageBody = () => {
    const [coordinates, setCoordinates] = useState<[number, number][]>([]);
    const [center, setCenter] = useState<[number, number]>([
        46.9119382485954, 2.2651793849164115,
    ]); //[43.68169106,3.84768334]
    /*const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("New file selected")
        const file = event.target.files![0];
        getCoordinatesFromGPX(file).then((coords) => {
            // Map over the coords to create an array of [lat, lng] pairs
            const latLngs: [number, number][] = coords.map(coord => [coord.lat, coord.lng]);
            setCoordinates(latLngs);
            setCenter(latLngs[Math.floor(latLngs.length / 2)]); 
        });
    };
    */
    return (
        <div
            className="
                fixed
                inset-0 
                bg-gray-200
                bg-opacity-50
                flex flex-col
                justify-start
                items-center
                pt-20
                px-4
                "
        >
            <div
                className="
                        flex
                        flex-col
                        md:flex-row
                        justify-between
                        items-center
                        gap-2
                        rounded-md
                        mt-2
                        w-full
                        h-[85vh]
                        "
            >
                <div
                    className="                        
                        rounded-md
                        w-full
                        h-3/5
                        md:w-3/5 
                        md:h-full
                        flex
                        flex-col
                        gap-2
                        "
                >
                    <div
                        className="
                            bg-white
                            p-1
                            md:p-4
                            rounded-md
                            shadow-lg
                            w-full
                            h-1/6
                            md:h-1/5
                            flex
                            flex-row
                            items-center
                            "
                    >
                        <FileInput
                            title="Upload a file"
                            acceptedFileTypes=".gpx, .kml"
                            onChange={() => {}}
                        />
                    </div>
                    <div
                        className="bg-white
                            p-4
                            rounded-md
                            shadow-lg
                            w-full
                            h-full
                            md:h-5/6
                            "
                    >
                        <Map id="map" center={center} polyline={coordinates} />
                    </div>
                </div>
                <div
                    className="
                    bg-white
                    p-4
                    rounded-md
                    shadow-lg
                    w-full
                    h-2/5
                    md:w-2/5
                    md:h-full
                    "
                >
                    hello
                </div>
            </div>
        </div>
    );
};

export default PageBody;
