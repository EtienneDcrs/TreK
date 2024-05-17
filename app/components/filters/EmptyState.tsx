"use client";

import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Button from "../Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Pas de correspondance",
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
                {showReset && (
                    <Button
                        outline
                        label="Supprimer les filtres"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
        </div>
    );
};
export default EmptyState;
