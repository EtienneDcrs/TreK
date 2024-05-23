"use client";

import { useSearchParams } from "next/navigation";
import CategoryBox from "./CategoryBox";
import { categories, difficulties } from "../modals/PostModal";
import DifficultyBox from "./DifficultyBox";
import DistanceSelector from "./DistanceSelector";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = ({}) => {
    const params = useSearchParams(); // get the search params (from the URL)
    const category = params?.get("category");
    const difficulty = params?.get("difficulty");
    return (
        <div className="flex flex-row justify-evenly items-center gap-2 w-full ">
            <div
                className="
                    grid
                    grid-cols-4
                    justify-center 
                    items-center 
                    gap-1
                    p-2
                    border-2 rounded-md
                    w-1/3
                    h-full
                "
            >
                {categories.map(
                    (
                        item // map through the categories to display them
                    ) => (
                        <div
                            key={item.label}
                            className="flex flex-col items-center"
                        >
                            <CategoryBox // display the category box, with the label and icon
                                label={item.label}
                                icon={item.icon}
                                selected={item.label === category}
                            />
                        </div>
                    )
                )}
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
                {difficulties.map(
                    (
                        item // map through the difficulties to display them
                    ) => (
                        <div
                            key={item.label}
                            className="flex flex-col items-center"
                        >
                            <DifficultyBox // display the difficulty box, with the label and color
                                label={item.label}
                                color={item.color}
                                selected={item.label === difficulty}
                            />
                        </div>
                    )
                )}
            </div>
            <div
                className="
                 flex flex-col 
                 justify-evenly 
                 items-center 
                 border-2 rounded-md
                 p-2
                 w-1/3 h-full
                "
            >
                <DistanceSelector />
            </div>
        </div>
    );
};
export default Filters;
