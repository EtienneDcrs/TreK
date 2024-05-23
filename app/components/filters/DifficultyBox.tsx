"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Suspense, useCallback } from "react";
import Loading from "../Loading";

interface DifficultyBoxProps {
    label: string;
    selected?: boolean;
    color: string;
}

const DifficultyBox: React.FC<DifficultyBoxProps> = ({
    label,
    selected,
    color,
}) => {
    const router = useRouter();
    const params = useSearchParams();
    var borderColor = "border-neutral-300";
    var bgColor = "white";
    var hoverColor = "hover:border-neutral-300";

    switch (
        color // switch statement to determine the color of the border and background
    ) {
        case "green":
            borderColor = "border-[green]";
            hoverColor = "hover:border-[green]";
            bgColor = "bg-[#ecfccb]";
            break;
        case "yellow":
            borderColor = "border-[yellow]";
            hoverColor = "hover:border-[yellow]";
            bgColor = "bg-[#fef9c3]";
            break;
        case "orange":
            borderColor = "border-[#f59e0b]";
            hoverColor = "hover:border-[#f59e0b]";
            bgColor = "bg-[#ffedd5]";
            break;
        case "red":
            borderColor = "border-[#dc2626]";
            hoverColor = "hover:border-[#dc2626]";
            bgColor = "bg-[#fee2e2]";
            break;
    }

    // function that push the new URL with the updated difficulty on click
    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString()); // parse the search params
        }
        const updatedQuery: any = {
            // update the query with the new difficulty
            ...currentQuery,
            difficulty: label,
        };
        if (params?.get("difficulty") === label) {
            // toggle off the difficulty if already selected
            delete updatedQuery.difficulty;
        }

        const url = qs.stringifyUrl(
            // put the updated query in the URL
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true } // skip null values
        );
        router.push(url); // redirect to the new URL
    }, [label, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                
                rounded-lg
                hover:opacity-80
                w-full
                border-2
                ${hoverColor} 
                ${selected ? borderColor : "border-neutral-200"}
                ${selected ? bgColor : "bg-white"}
            `}
        >
            <div className="text-sm font-light text-neutral-500">{label}</div>
        </div>
    );
};

const DifficultyBoxWithSuspense: React.FC<DifficultyBoxProps> = ({
    label,
    selected,
    color,
}) => {
    return (
        <Suspense fallback={<Loading />}>
            <DifficultyBox label={label} selected={selected} color={color} />
        </Suspense>
    );
};

export default DifficultyBoxWithSuspense;
