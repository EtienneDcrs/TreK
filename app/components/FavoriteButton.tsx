"use client";

import { SafeUser } from "../types";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import useFavorite from "../hooks/useFavorite";

interface FavoriteButtonProps {
    postId: string;
    currentUser?: SafeUser | null;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    postId,
    currentUser,
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        postId,
        currentUser,
    });

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover opacity-80 transition cursor-pointer"
        >
            <IoIosStarOutline
                size={24}
                className="
                    fill-gray-400 
                    absolute
                    top-[5px]
                    right-[6px]
                    z-10"
            />
            <MdOutlineStar
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
