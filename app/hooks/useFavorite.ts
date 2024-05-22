
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUserFavorite {
    postId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ postId, currentUser }: IUserFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(postId);
    }, [currentUser, postId]);

    const toggleFavorite = useCallback(async ( 
        e:React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            loginModal.onOpen();
            return;
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${postId}`);
            } else {
                request = () => axios.post(`/api/favorites/${postId}`);
            }

            await request();
            router.refresh();
            if (hasFavorited){
                toast.success("Retiré des favoris");
            } else {
                toast.success("Ajouté aux favoris");
            }

        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [currentUser, hasFavorited, loginModal, postId, router]);

    return { hasFavorited, toggleFavorite };

};

export default useFavorite;

