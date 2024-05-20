"use client";

import { SafePost } from "../types";
import EmptyState from "./filters/EmptyState";
import PostCard from "./PostCard";
import { useSearchParams } from "next/navigation";

interface PostsListProps {
    posts: any[];
    currentUser: any;
}

const PostsList: React.FC<PostsListProps> = ({ posts, currentUser }) => {
    const params = useSearchParams();
    const category = params?.get("category");
    const user = params?.get("user");
    const difficulty = params?.get("difficulty");
    const favorite = params?.get("favorite");

    if (category) {
        posts = posts.filter((post: SafePost) => post.category === category);
    }
    if (user) {
        posts = posts.filter((post: SafePost) => post.authorId === user);
    }
    if (difficulty) {
        posts = posts.filter(
            (post: SafePost) => post.difficulty === difficulty
        );
    }
    if (favorite) {
        posts = posts.filter((post: SafePost) =>
            currentUser.favoriteIds.includes(post.id)
        );
    }
    if (posts.length == 0) {
        return <EmptyState showReset />;
    }

    return (
        <div
            className="
                bg-white
                p-4
                rounded-md
                shadow-lg
                w-full
                md:w-1/2
                md:h-full
                gap-2
                overflow-y-auto
                "
        >
            <div
                className="
                grid grid-cols-1
                lg:grid-cols-2
                gap-4
            "
            >
                {posts.map((post: SafePost) => {
                    return (
                        <PostCard
                            key={post.id}
                            currentUser={currentUser}
                            data={post}
                        />
                    );
                })}
            </div>
        </div>
    );
};
export default PostsList;
