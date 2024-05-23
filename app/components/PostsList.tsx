"use client";
import { SafePost } from "../types";
import EmptyState from "./filters/EmptyState";
import PostCard from "./PostCard";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"; // Importation de socket.io-client
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PostModal from "./modals/PostModal";

interface PostsListProps {
    currentUser: any;
    isAdmin?: boolean;
}

// //unused interface
// interface Post {
//     id: String;
//     title: String;
//     description: String;
//     authorId: String;
//     lats: number[];
//     lngs: number[];
//     elevations: number[];
//     category: String;
//     length: number;
//     difficulty: String;
// }

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

    // connexion to the socket server
    useEffect(() => {
        const s = socket // if the socket exists, use it
            ? socket // otherwise, create a new socket connection to the server (3001 port)
            : io("http://" + window.location.host.split(":")[0] + ":3001");
        setSocket(s);

        // get the posts from the server
        s.on("restorePosts", (posts: SafePost[]) => {
            setPosts(posts);
            setDisplayedPosts(posts);
        });

        return () => {
            if (socket) socket.disconnect(); // disconnect the socket when the component unmounts
        };
    }, []);

    // filter the posts based on the filters parameters
    useEffect(() => {
        setDisplayedPosts(posts); // reset the displayed posts
        if (category) {
            setDisplayedPosts(
                posts.filter((post: SafePost) => post.category === category)
            );
        }
        if (difficulty) {
            setDisplayedPosts(
                posts.filter((post: SafePost) => post.difficulty === difficulty)
            );
        }
        if (user) {
            setDisplayedPosts(
                posts.filter((post: SafePost) => post.authorId === user)
            );
        }
        if (favorite) {
            setDisplayedPosts(
                posts.filter((post: SafePost) =>
                    currentUser.favoriteIds.includes(post.id)
                )
            );
        }
    }, [category, user, difficulty, favorite, params, posts]); // re-run the effect when the filters parameters change

    // Render posts
    return (
        <>
            <PostModal currentUser={currentUser} socket={socket} />
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
        </>
    );
};

export default PostsList;
