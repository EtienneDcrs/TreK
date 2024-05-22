"use client";

interface DifficultyInputProps {
    onClick: (value: string) => void;
    label: string;
    selected?: boolean;
    color: string;
}

const DifficultyInput: React.FC<DifficultyInputProps> = ({
    onClick,
    label,
    selected,
    color,
}) => {
    var borderColor = "border-neutral-300";
    var bgColor = "bg-neutral-100";
    var hoverColor = "hover:border-neutral-300";

    switch (
        color // switch statement to determine the color of the border and background
    ) {
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

    return (
        <div
            onClick={() => onClick(label)} // call the onClick function with the label as argument
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-row
                items-center
                gap-3
                opacity-50
                transition
                cursor-pointer
                ${hoverColor}
                ${selected ? borderColor : "border-neutral-300"}
                ${selected ? bgColor : "bg-neutral-100"}

            `}
        >
            <div className="font-semibold">{label}</div>
        </div>
    );
};

export default DifficultyInput;
