"use client";

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    bgColor,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                hover:shadow-lg
                w-full
                font-semibold
                ${outline && !bgColor ? "bg-white" : "bg-black"}
                ${outline ? "border-black" : "border-black"}
                ${outline ? "text-black" : "text-white"}
                ${bgColor ? bgColor : ""}
                ${small ? "py-1" : "py-3"}
                ${small ? "text-sm" : "text-md"}
                ${small ? "border-[1px]" : "border-2"}
            
            `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
                    absolute
                    left-4
                    top-3"
                />
            )}
            {label}
        </button>
    );
};

export default Button;
