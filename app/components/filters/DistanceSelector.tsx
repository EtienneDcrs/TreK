import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import React, { useCallback, useState } from "react";

const DistanceSelector = () => {
    const router = useRouter();
    const params = useSearchParams();

    const [minDistance, setMinDistance] = useState("");
    const [maxDistance, setMaxDistance] = useState("");

    const handleChange = useCallback(
        (newMin: number | null, newMax: number | null) => {
            let currentQuery = {};
            if (params) {
                currentQuery = qs.parse(params.toString()); // parse the search params
            }
            let updatedQuery = {};
            if (newMin) {
                updatedQuery = {
                    ...currentQuery,
                    min: newMin,
                };
            } else if (newMax) {
                updatedQuery = {
                    ...currentQuery,
                    max: newMax,
                };
            }

            const url = qs.stringifyUrl(
                {
                    url: "/",
                    query: updatedQuery,
                },
                { skipNull: true } // skip null values
            );
            router.push(url); // redirect to the new URL
        },
        [params, router]
    );

    const handleMinChange = (event: any) => {
        const value = event.target.value;
        setMinDistance(value);
        handleChange(value, null);
    };

    const handleMaxChange = (event: any) => {
        const value = event.target.value;
        setMaxDistance(value);
        handleChange(null, value);
    };

    return (
        <div
            className="
            text-sm font-light
            flex flex-row justify-evenly items-center
            gap-2
            h-full
        "
        >
            <div className="flex flex-col items-center justify-around gap-1">
                <label htmlFor="minDistance">km min:</label>
                <input
                    className="border-2 rounded-md w-16 h-6 px-2 py-1"
                    type="number"
                    id="minDistance"
                    value={minDistance}
                    onChange={handleMinChange}
                />
            </div>
            <div className="flex flex-col items-center justify-around gap-1">
                <label htmlFor="minDistance">km max:</label>
                <input
                    className="border-2 rounded-md w-16 h-6 px-2 py-1"
                    type="number"
                    id="maxDistance"
                    value={maxDistance}
                    onChange={handleMaxChange}
                />
            </div>
        </div>
    );
};

export default DistanceSelector;
