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

    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };
        if (params?.get("category") === label) {
            delete updatedQuery.category;
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
                hover:border-black
                ${selected ? "border-black" : "border-neutral-200"}
            `}
        >
            <Icon size={20} />
            {/* <div className="text-xs font-light text-neutral-500">{label}</div> */}
        </div>
    );
};

export default CategoryBox;
