"use client";

import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";

import useFavorite from "../hooks/useFavorite";
import { SafeUser } from "../types";

interface FavoriteButtonProps {
    postId: string;
    currentUser?: SafeUser | null;
}

// Button component for favoriting a post
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    postId,
    currentUser,
}) => {
    // Custom hook to handle favoriting/unfavoriting a post
    const { hasFavorited, toggleFavorite } = useFavorite({
        postId,
        currentUser,
    });

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover opacity-80 transition cursor-pointer"
        >
            <IoIosStarOutline // outlined gray icon
                size={24}
                className="
                    fill-gray-400 
                    absolute
                    top-[5px]
                    right-[6px]
                    z-10"
            />
            <MdOutlineStar // yellow star icon if favorited
                size={23}
                className={`
                    absolute
                    top-[6px]
                    right-[7px]
                    ${hasFavorited ? "fill-yellow-400" : "fill-white"}
                `}
            />
        </div>
    );
};

export default FavoriteButton;
