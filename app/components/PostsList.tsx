/*"use client";

interface PostsListProps {
    currentUser: any;
    posts: any[];
    isAdmin?: boolean;
}
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:3001");

        // Fetch initial posts
        fetch("http://localhost:3001/posts")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            });

        // Listen for new posts
        socket.on("newPost", (newPost) => {
            setPosts((prevPosts) => [...prevPosts, newPost]);
        });

        // Clean up on unmount
        return () => {
            socket.off("newPost");
        };
    }, []);

    // Render posts
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
}

export default PostsList;
/*
*/
"use client";

import { SafePost } from "../types";
import EmptyState from "./filters/EmptyState";
import PostCard from "./PostCard";
import { useSearchParams } from "next/navigation";

interface PostsListProps {
    posts: any[];
    currentUser: any;
    isAdmin?: boolean;
}

const PostsList: React.FC<PostsListProps> = ({
    posts,
    currentUser,
    isAdmin,
}) => {
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
                md:w-2/5
                lg:w-1/2
                h-2/5
                md:h-full
                gap-2
                overflow-y-auto
                "
        >
            <div
                className="
                grid grid-cols-1
                2xl:grid-cols-2
                gap-4
            "
            >
                {posts.map((post: SafePost) => {
                    return (
                        <PostCard
                            key={post.id}
                            currentUser={currentUser}
                            data={post}
                            isAdmin={isAdmin}
                        />
                    );
                })}
            </div>
        </div>
    );
};
export default PostsList;
