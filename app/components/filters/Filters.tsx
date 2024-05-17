"use client";

import { useSearchParams } from "next/navigation";
import CategoryBox from "./CategoryBox";
import { categories, difficulties } from "../modals/PostModal";
import { IconType } from "react-icons";
import DifficultyBox from "./DifficultyBox";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = ({}) => {
    const params = useSearchParams();
    const category = params?.get("category");
    const difficulty = params?.get("difficulty");
    return (
        <div className="flex flex-row justify-evenly items-center gap-2 w-full h-full ">
            <div
                className="
                    grid
                    grid-cols-4
                    justify-center 
                    items-center 
                    gap-1
                    p-2
                    border-2 rounded-md
                    w-1/3 h-full
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
            <div
                className="
                    grid
                    grid-cols-2
                    justify-evenly 
                    items-center 
                    gap-1
                    p-2
                    border-2 rounded-md
                    w-1/3 h-full
                "
            >
                {difficulties.map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center"
                    >
                        <DifficultyBox
                            label={item.label}
                            color={item.color}
                            selected={item.label === difficulty}
                        />
                    </div>
                ))}
            </div>
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
                Durée
            </div>
        </div>
    );
};
export default Filters;
