'use client';

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading = ({
    title,
    subtitle,
    center,
}: HeadingProps) => {
    return(
        <div
            className={center ? "text-center" : "text-start pl-2 "}
        >
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div>
                {subtitle}
            </div>
        </div>
    );
};

export default Heading;