import { useState } from "react";
import { SafeUser } from "../types";
import { IoTrashBinOutline, IoTrashBinSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "./Button";

interface DeleteButtonProps {
    postId: string;
    currentUser?: SafeUser | null;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, currentUser }) => {
    const router = useRouter();
    const [isConfirming, setIsConfirming] = useState(false);

    const handleDelete = async () => {
        if (!currentUser) {
            return;
        }
        try {
            await axios.delete(`/api/posts/${postId}`);
            router.push("/");
            router.refresh();
            toast.success("Post supprimé");
        } catch (error) {
            toast.error("Une erreur s'est produite");
        }
    };

    const handleConfirm = () => {
        setIsConfirming(true);
    };

    const handleCancel = () => {
        setIsConfirming(false);
    };

    const handleConfirmDelete = () => {
        handleDelete();
        setIsConfirming(false);
    };

    return (
        <div className="relative">
            {!isConfirming ? (
                <div
                    onClick={handleConfirm}
                    className="icon-container text-gray-400 hover:text-red-500 cursor-pointer"
                >
                    <IoTrashBinOutline
                        size={24}
                        className="absolute top-[6px] left-[6px] z-10"
                    />
                </div>
            ) : (
                <div className="flex flex-row items-center gap-2 p-2 ">
                    <div className="w-2/3">
                        Voulez-vous vraiment supprimer ce post ?
                    </div>
                    <div className="w-1/3 px-4 py-2 gap-1 flex flex-row">
                        <Button
                            label="Oui"
                            onClick={handleConfirmDelete}
                            small
                            outline
                            bgColor="bg-red-500"
                        />
                        <Button
                            label="Non"
                            onClick={handleCancel}
                            outline
                            small
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteButton;
