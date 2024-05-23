"use client";

import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Button from "../buttons/Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Pas de correspondance", // default title if no title is provided
    subtitle = "Essayez de changer vos critères de recherche",
    showReset,
}) => {
    const router = useRouter();
    return (
        <div
            className="
                bg-white
                p-8
                rounded-md
                shadow-lg
                w-full
                h-2/5
                md:w-2/5
                md:h-full
                flex flex-col
                items-center
                "
        >
            <Heading center title={title} subtitle={subtitle} />
            <div className="w-48 mt-4">
                {showReset && ( // if showReset is true, display the button
                    <Button
                        outline
                        label="Supprimer les filtres"
                        onClick={() => router.push("/")} // redirect to the main page
                    />
                )}
            </div>
        </div>
    );
};
export default EmptyState;
