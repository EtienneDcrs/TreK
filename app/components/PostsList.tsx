"use client";
import { SafePost } from "../types";
import EmptyState from "./filters/EmptyState";
import PostCard from "./PostCard";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"; // Importation de socket.io-client
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PostModal from "./modals/PostModal";
import { set } from "react-hook-form";

interface PostsListProps {
    currentUser: any;
    isAdmin?: boolean;
}

interface Post {
    id: String;
    title: String;
    description: String;
    authorId: String;
    lats: number[];
    lngs: number[];
    elevations: number[];
    category: String;
    length: number;
    difficulty: String;
}

const PostsList: React.FC<PostsListProps> = ({ currentUser, isAdmin }) => {
    const [posts, setPosts] = useState<SafePost[]>([]);
    const [displayedPosts, setDisplayedPosts] = useState<SafePost[]>([]);
    const [socket, setSocket] =
        useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const params = useSearchParams();
    const category = params?.get("category");
    const user = params?.get("user");
    const difficulty = params?.get("difficulty");
    const favorite = params?.get("favorite");
    // Connexion au serveur de sockets
    useEffect(() => {
        const s = socket
            ? socket
            : io("http://" + window.location.host.split(":")[0] + ":3001");
        setSocket(s);

        s.on("restorePosts", (posts: SafePost[]) => {
            setPosts(posts); // Restaurer les commentaires précédents
            setDisplayedPosts(posts);
        });

        s.on("newPost", (post: Post) => {
            setPosts((prevPosts) => {
                const newPosts = [...prevPosts, post];
                return Array.from(
                    new Set(newPosts.map((c) => JSON.stringify(c)))
                ).map((c) => JSON.parse(c));
            }); // Ajouter le nouveau post à la liste des posts
            setDisplayedPosts(posts);
        });

        return () => {
            if (socket) socket.disconnect(); // Déconnexion du serveur de sockets lorsque le composant est démonté
        };
    }, []);

    // Filtrer les posts
    useEffect(() => {
        setDisplayedPosts(posts);
        if (category) {
            setDisplayedPosts(
                posts.filter((post: SafePost) => post.category === category)
            );
        }
        if (user) {
            setDisplayedPosts(
                posts.filter((post: SafePost) => post.authorId === user)
            );
        }
        if (difficulty) {
            setDisplayedPosts(
                posts.filter((post: SafePost) => post.difficulty === difficulty)
            );
        }
        if (favorite) {
            setDisplayedPosts(
                posts.filter((post: SafePost) =>
                    currentUser.favoriteIds.includes(post.id)
                )
            );
        }
    }, [category, user, difficulty, favorite]);

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
                2xl:grid-cols-2
                gap-4
            "
                >
                    {displayedPosts.map((post: SafePost, index) => {
                        return (
                            <PostCard
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

/*
"use client";


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
*/
