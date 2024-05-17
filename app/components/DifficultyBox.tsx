"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";

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

    switch (color) {
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
    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            difficulty: label,
        };
        if (params?.get("difficulty") === label) {
            delete updatedQuery.difficulty;
        }

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );
        router.push(url);
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
                ${selected ? borderColor : "border-neutral-300"}
                ${selected ? bgColor : "bg-white"}
            `}
        >
            {/* <Icon size={20} /> */}
            <div className="text-sm font-light text-neutral-500">{label}</div>
        </div>
    );
};

export default DifficultyBox;
