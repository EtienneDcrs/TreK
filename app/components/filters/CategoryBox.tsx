"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";
import { useCallback } from "react";

interface CategoryBoxProps {
    label: string;
    selected?: boolean;
    icon: IconType;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    selected,
    icon: Icon,
}) => {
    const router = useRouter();
    const params = useSearchParams();

    // function that push the new URL with the updated category on click
    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString()); // parse the search params
        }
        const updatedQuery: any = {
            ...currentQuery,
            category: label, // update the query with the new category
        };
        if (params?.get("category") === label) {
            delete updatedQuery.category; // toggle off the category if already selected
        }

        const url = qs.stringifyUrl(
            // create the new URL with the updated query
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
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
                hover:border-black
                ${selected ? "border-black" : "border-neutral-200"}
            `}
        >
            <Icon size={20} />
        </div>
    );
};

export default CategoryBox;
