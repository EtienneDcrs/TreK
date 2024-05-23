import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoTrashBinOutline } from "react-icons/io5";
import io, { Socket } from "socket.io-client"; // import the socket.io client
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { SafeUser } from "../../types";
import Button from "./Button";

interface DeleteButtonProps {
    postId: string; // ID of the post to delete
    currentUser?: SafeUser | null;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, currentUser }) => {
    const router = useRouter();
    const [isConfirming, setIsConfirming] = useState(false); // State to confirm the deletion of the post
    const [socket, setSocket] =
        useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

    useEffect(() => {
        const s = socket // if the socket exists, use it
            ? socket // otherwise, create a new socket connection to the server (3001 port)
            : io("http://" + window.location.host.split(":")[0] + ":3001");
        setSocket(s); // set the socket state to the new socket connection
        return () => {
            if (socket) socket.disconnect(); // disconnect the socket when the component unmounts
        };
    }, []);

    // Function to handle the deletion of the post
    const handleDelete = async () => {
        if (!currentUser) {
            return; // if the user is not logged in, return
        }
        try {
            socket?.emit("deletePost", postId); // emit the deletePost event to the server
            router.push("/"); // redirect to the home page
            router.refresh();
            toast.success("Post supprimé"); // show a success toast message
        } catch (error) {
            toast.error("Une erreur s'est produite"); // show an error toast message
        }
    };

    // Function to confirm the deletion of the post
    const handleConfirm = () => {
        setIsConfirming(true);
    };

    const handleCancel = () => {
        setIsConfirming(false);
    };

    // Function to handle the confirmed deletion of the post
    const handleConfirmDelete = () => {
        handleDelete();
        setIsConfirming(false);
    };

    return (
        <div className="relative">
            {!isConfirming ? ( // Display the delete button if the state is not confirming
                <div
                    onClick={handleConfirm}
                    className="icon-container text-gray-400 hover:text-red-500 cursor-pointer"
                >
                    <IoTrashBinOutline // Trash bin icon
                        size={24}
                        className="absolute top-[6px] left-[6px] z-10"
                    />
                </div>
            ) : (
                // Display the confirmation dialog if the state is confirming
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
