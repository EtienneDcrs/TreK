'use client';

import { on } from "events";
import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick: (value:string)=>void;
    label: string;
    selected?: boolean;
    icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    label,
    selected,
    icon: Icon
}) => {


    return (
        <div
            onClick={()=>onClick(label)}
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-row
                items-center
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'border-black' : 'border-neutral-300'}

            `}
        >
            <Icon size={30}/>
            <div className="font-semibold">
                {label}
            </div>
        </div>
    );
};

export default CategoryInput;
    