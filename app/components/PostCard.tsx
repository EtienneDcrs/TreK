"use client";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

import { categories } from "./modals/PostModal"; // Import the categories from the PostModal component
import FavoriteButton from "./FavoriteButton";
import DeleteButton from "./DeleteButton";
import { SafePost } from "../types";

interface PostCardProps {
    data: SafePost;
    currentUser: any;
    isAdmin?: boolean; // Optional prop to check if the user is an admin
}

const PostCard: React.FC<PostCardProps> = ({ data, currentUser, isAdmin }) => {
    const router = useRouter();
    const category = categories.find((c) => c.label === data.category); // Find the category based on the post's category
    const Icon: IconType | undefined = category?.icon;
    return (
        <div>
            {/* Display the delete button if the user is the post's author or an admin */}
            {(data.authorId === currentUser?.id || isAdmin) && (
                <DeleteButton postId={data.id} currentUser={currentUser} />
            )}
            {/* Display the favorite button */}
            <FavoriteButton postId={data.id} currentUser={currentUser} />
            <div
                onClick={() => {
                    router.push(`/posts/${data.id}`); // Redirect to the post page on click
                }}
                className="
                flex flex-col
                justify-start items-center
                p-3
                cursor-pointer 
                h-[20vh]
                rounded-md
                gap-2
                w-full
                border-2
                "
            >
                <div className="text-l font-semibold text-center">
                    {data.title}
                </div>
                <div className="flex flex-row justify-evenly items-center w-full ">
                    <div className="flex flex-row items-center justify-center gap-2">
                        {Icon && <Icon size={26} />}{" "}
                        {/* Display the category icon */}
                        {category?.label}
                    </div>
                    <div
                        className="flex flex-row 
                    justify-center items-center 
                    gap-2
                    "
                    >
                        <div // Display the difficulty badge with the corresponding color
                            className={`
                        ${data.difficulty === "Facile" && "bg-green-300"}
                        ${data.difficulty === "Moyen" && "bg-yellow-200"}
                        ${data.difficulty === "Difficile" && "bg-orange-300"}
                        ${data.difficulty === "Expert" && "bg-red-400"}
                        ${data.difficulty === "Facile" && "border-green-500"}
                        ${data.difficulty === "Moyen" && "border-yellow-400"}
                        ${
                            data.difficulty === "Difficile" &&
                            "border-orange-500"
                        }
                        ${data.difficulty === "Expert" && "border-red-500"}
                        p-3
                        border-2
                        rounded-full
                    `}
                        ></div>
                        <div>{data.difficulty}</div>
                    </div>
                </div>
                {/* <div>{data.description}</div> */}
                <br />
            </div>
        </div>
    );
};

export default PostCard;
