"use client";

import { IconType } from "react-icons";
import { SafePost } from "../types";
import Heading from "./Heading";
import { categories } from "./modals/PostModal";
import DeleteButton from "./DeleteButton";
import FavoriteButton from "./FavoriteButton";

interface PostContentProps {
    post: SafePost;
    currentUser: any;
    isAdmin?: boolean;
}

const PostContent: React.FC<PostContentProps> = ({
    post,
    currentUser,
    isAdmin,
}) => {
    const category = categories.find((c) => c.label === post.category);
    const Icon: IconType | undefined = category?.icon;
    const coords: [number, number][] = [];
    console.log(coords);
    return (
        <div
            className="
                bg-white
                flex flex-col
                gap-6
                p-8
                rounded-md
                shadow-lg
                w-full
                md:w-1/2
                md:h-full
                overflow-y-auto
                "
        >
            <div>
                {(post.authorId === currentUser?.id || isAdmin) && (
                    <DeleteButton postId={post.id} currentUser={currentUser} />
                )}
                <FavoriteButton postId={post.id} currentUser={currentUser} />
                <Heading title={post.title} center />
            </div>
            <div
                className="
                    flex
                flex-row
                justify-evenly
                items-center
                gap-2"
            >
                <div
                    className="flex flex-col 
                    justify-center items-center 
                    p-2 
                    gap-2
                    "
                >
                    <div>{Icon && <Icon size={36} />}</div>
                    <div>{category?.label}</div>
                </div>
                <div className="h-full">
                    <div
                        className="flex flex-col 
                        justify-center items-center 
                        p-2
                        pt-4
                        gap-3
                        h-full
                        "
                    >
                        <div>{post.length.toFixed(2)} km</div>
                        <div>Distance</div>
                    </div>
                </div>
                <div
                    className="flex flex-col 
                    justify-center items-center 
                    p-2 
                    gap-2
                    "
                >
                    <div
                        className={`
                        ${post.difficulty === "Facile" && "bg-green-300"}
                        ${post.difficulty === "Moyen" && "bg-yellow-200"}
                        ${post.difficulty === "Difficile" && "bg-orange-300"}
                        ${post.difficulty === "Expert" && "bg-red-400"}
                        ${post.difficulty === "Facile" && "border-green-500"}
                        ${post.difficulty === "Moyen" && "border-yellow-400"}
                        ${
                            post.difficulty === "Difficile" &&
                            "border-orange-500"
                        }
                        ${post.difficulty === "Expert" && "border-red-500"}
                        p-4
                        border-2
                        rounded-full
                    `}
                    ></div>
                    <div>{post.difficulty}</div>
                </div>
            </div>
            <hr />
            <div
                className="
                p-4
                pt-2
                flex
                flex-col
                justify-start
                items-center
                rounded-lg
                gap-3
                h-full"
            >
                <div className="text-xl font-semibold">
                    Description de la randonnée
                </div>
                <div className="text-justify text-md font-light w-full h-full overflow-y-auto ">
                    {post.description}
                </div>
            </div>
        </div>
    );
};
export default PostContent;
