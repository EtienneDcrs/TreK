"use client";

import { BsPostcard } from "react-icons/bs";
import EmptyState from "./EmptyState";
import PostCard from "./PostCard";
import { getCurrentUser } from "../actions/getCurrentUser";
import { useSearchParams } from "next/navigation";

interface PostsListProps {
    posts: any[];
    currentUser: any;
}

const PostsList: React.FC<PostsListProps> = ({ posts, currentUser }) => {
    const params = useSearchParams();
    const category = params?.get("category");

    if (posts.length === 0) {
        return <EmptyState showReset />;
    }

    if (category) {
        posts = posts.filter((post: any) => post.category === category);
    }

    return (
        <div
            className="
                bg-white
                p-4
                rounded-md
                shadow-lg
                w-full
                md:w-2/5
                lg:w-1/2
                md:h-full
                gap-2
                overflow-y-auto
                "
        >
            <div
                className="
                grid grid-cols-1
                md:grid-cols-2
                gap-4
            "
            >
                {posts.map((post: any) => {
                    return (
                        <PostCard
                            currentUser={currentUser}
                            key={post.id}
                            data={post}
                        />
                    );
                })}
            </div>
        </div>
    );
};
export default PostsList;
