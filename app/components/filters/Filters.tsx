"use client";

import { useSearchParams } from "next/navigation";
import { categories, difficulties } from "../modals/PostModal";
import CategoryBoxWithSuspense from "./CategoryBox";
import { Suspense } from "react";
import Loading from "../Loading";
import DifficultyBoxWithSuspense from "./DifficultyBox";
import DistanceSelectorWithSuspense from "./DistanceSelector";

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
                            <CategoryBoxWithSuspense // display the category box, with the label and icon
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
                            <DifficultyBoxWithSuspense // display the difficulty box, with the label and color
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
                <DistanceSelectorWithSuspense />
            </div>
        </div>
    );
};

const FiltersWithSuspense: React.FC<FiltersProps> = ({}) => {
    return (
        <Suspense fallback={<Loading />}>
            <Filters />
        </Suspense>
    );
};

export default FiltersWithSuspense;
