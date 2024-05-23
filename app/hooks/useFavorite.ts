
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

// hook to manage the favorite feature
const useFavorite = ({ postId, currentUser }: IUserFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => { // check if the post is in the user's favorites
        const list = currentUser?.favoriteIds || [];

        return list.includes(postId);
    }, [currentUser, postId]);

    const toggleFavorite = useCallback(async ( 
        e:React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation(); // prevent the click event from propagating to the parent element

        if (!currentUser) { // if the user is not logged in, open the login modal
            loginModal.onOpen();
            return;
        }

        try {
            let request;

            if (hasFavorited) { // if the post is already in the user's favorites, remove it
                request = () => axios.delete(`/api/favorites/${postId}`);
            } else { // otherwise, add it
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

    return { hasFavorited, toggleFavorite }; // return the hook's state and function

};

export default useFavorite;

