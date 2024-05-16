"use client";

import { useSearchParams } from "next/navigation";
import CategoryBox from "./CategoryBox";
import { categories } from "./modals/PostModal";
import { IconType } from "react-icons";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = ({}) => {
    const params = useSearchParams();
    const category = params?.get("category");
    return (
        <div className="flex flex-row justify-evenly items-center gap-2 w-full h-full ">
            <div
                className="
                    grid
                    grid-cols-4
                    justify-evenly 
                    items-center 
                    gap-2
                    border-2 rounded-md
                    w-2/3 h-full
                "
            >
                {categories.map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center"
                    >
                        <CategoryBox
                            label={item.label}
                            icon={item.icon}
                            selected={item.label === category}
                        />
                    </div>
                ))}
            </div>
            <hr className="h-full" />
            <div
                className="
                 flex flex-col 
                 justify-center 
                 items-center 
                 gap-2 
                 border-2 rounded-md
                 w-1/3 h-full
                "
            >
                23
            </div>
        </div>
    );
};
export default Filters;
