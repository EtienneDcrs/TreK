"use client";
import { Route } from "@prisma/client";
import { useRouter } from "next/navigation";

interface PostCardProps {
    data: Route;
    currentUser: any;
}

const PostCard: React.FC<PostCardProps> = ({ data, currentUser }) => {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                //router.push(`/post/${data.id}`);
            }}
            className="
                cursor-pointer 
                h-28 
                rounded-md
                gap-2
                w-full
                border-2
                "
        >
            {data.title}
            <br />

            {data.description}
            {data.category}
        </div>
    );
};

export default PostCard;
