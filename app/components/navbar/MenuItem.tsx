"use client";

interface MenuItemProps {
    onClick: () => void;
    label: String;
    className?: String;
}

// component for each menu item in the navbar
const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, className }) => {
    return (
        <div
            onClick={onClick}
            className={`
                ${className}
                px-4
                py-3
                hover:bg-neutral-100
                transition
                font-semibold
                `}
        >
            {label}
        </div>
    );
};

export default MenuItem;
