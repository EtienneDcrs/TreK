"use client";
import { SafePost } from "../../types";
import EmptyState from "../filters/EmptyState";
import PostCard from "./PostCard";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"; // Importation de socket.io-client
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PostModal from "../modals/PostModal";
import Loading from "../Loading";

interface PostsListProps {
    currentUser: any;
    isAdmin?: boolean;
}

const PostsList: React.FC<PostsListProps> = ({ currentUser, isAdmin }) => {
    const [posts, setPosts] = useState<SafePost[]>([]); // State to store the posts
    const [displayedPosts, setDisplayedPosts] = useState<SafePost[]>([]); // State to store the posts to display
    const [socket, setSocket] =
        useState<Socket<DefaultEventsMap, DefaultEventsMap>>(); // socket state
    const params = useSearchParams();
    // get the filters parameters from the URL
    const category = params?.get("category");
    const user = params?.get("user");
    const difficulty = params?.get("difficulty");
    const favorite = params?.get("favorite");
    const min = params?.get("min");
    const max = params?.get("max");

    // connexion to the socket server
    useEffect(() => {
        const s = socket // if the socket exists, use it
            ? socket // otherwise, create a new socket connection to the server
            : io("http://" + window.location.host);
        setSocket(s);

        // get the posts from the server
        s.on("restorePosts", (posts: SafePost[]) => {
            setPosts(posts);
        });

        return () => {
            if (socket) socket.disconnect(); // disconnect the socket when the component unmounts
        };
    }, [socket]);

    // filter the posts based on the filters parameters
    useEffect(() => {
        // get the filters parameters from the URL
        const category = params?.get("category");
        const user = params?.get("user");
        const difficulty = params?.get("difficulty");
        const favorite = params?.get("favorite");
        const min = params?.get("min");
        const max = params?.get("max");
        const displayedPostsList = [];
        for (let post of posts) {
            let isDisplayed = true;
            if (category && post.category !== category) {
                isDisplayed = false;
            }
            if (difficulty && post.difficulty !== difficulty) {
                isDisplayed = false;
            }
            if (min && post.length < parseInt(min)) {
                isDisplayed = false;
            }
            if (max && post.length > parseInt(max)) {
                isDisplayed = false;
            }
            if (user && post.authorId !== user) {
                isDisplayed = false;
            }
            if (favorite && !currentUser.favoriteIds.includes(post.id)) {
                isDisplayed = false;
            }
            if (isDisplayed) {
                displayedPostsList.push(post);
            }
        }
        setDisplayedPosts(displayedPostsList);
    }, [
        category,
        user,
        difficulty,
        favorite,
        params,
        posts,
        currentUser,
        min,
        max,
    ]); // re-run the effect when the filters parameters change

    // Render posts
    return (
        <>
            {currentUser && (
                <PostModal currentUser={currentUser} socket={socket} />
            )}
            {displayedPosts.length === 0 ? (
                <EmptyState showReset />
            ) : (
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
                xl:grid-cols-2
                gap-4
            "
                    >
                        {displayedPosts.map((post: SafePost, index) => {
                            return (
                                <PostCard // display the post card
                                    key={index}
                                    currentUser={currentUser}
                                    data={post}
                                    isAdmin={isAdmin}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

const PostsListWithSuspense: React.FC<PostsListProps> = ({
    currentUser,
    isAdmin,
}) => {
    return (
        <Suspense fallback={<Loading />}>
            <PostsList currentUser={currentUser} isAdmin={isAdmin} />
        </Suspense>
    );
};

export default PostsListWithSuspense;
