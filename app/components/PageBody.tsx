'use client';

import { useState } from "react";
import { getCoordinatesFromGPX } from "../actions/getCoordinates";
import FileInput from "./inputs/FileInput";
import Map from "./map/Map";
import { LatLngExpression } from "leaflet";



const PageBody = () => {
    const [coordinates, setCoordinates] = useState<[number, number][]>([]);
    const [center, setCenter] = useState<[  number,number]>([46.9119382485954, 2.2651793849164115]); //[43.68169106,3.84768334]
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
            {/* <div 
                className="
                    bg-white
                    p-4
                    mt-2
                    rounded-md
                    shadow-lg
                    w-full
                    "
            >
                <h1 className="text-2xl font-bold mb-2">Welcome to my App</h1>
                <p className="text-gray-600">This is a simple app to help you find hiking trails near you.</p>
            </div> */}
            {/* <div
                className="
                bg-white
                p-4
                mt-2
                rounded-md
                shadow-lg
                w-full
                "
            >
                <h2 className="text-xl font-bold mb-2">How to use this app</h2>
                <p className="text-gray-600">Enter your location in the search bar above and click search.</p>
            </div> */}
            <div className="
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
                        bg-white
                        p-4
                        rounded-md
                        shadow-lg
                        w-full
                        h-3/5
                        md:w-3/5 
                        md:h-full
                        "
                >
                    <Map center={center} polyline={coordinates}/>
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
                    
                    <FileInput title="Upload a file" acceptedFileTypes=".gpx, .kml" onChange={()=>{}}/>
                </div>
                <div
                    className="
                        bg-white
                        p-4
                        rounded-md
                        shadow-lg
                        w-full
                        h-1/5
                        md:w-1/5
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
