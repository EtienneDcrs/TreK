"use client";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SafePost } from "../types";

interface PostCardProps {
    data: SafePost;
    currentUser: any;
}

const PostCard: React.FC<PostCardProps> = ({ data, currentUser }) => {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push(`/posts/${data.id}`);
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
            <br />
            {data.category}
        </div>
    );
};

export default PostCard;
