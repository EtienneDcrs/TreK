"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import useLoginModal from "@/app/hooks/useLoginModal";
import Loading from "../Loading";

interface NavItemProps {
    currentUser: any;
}

const NavItem: React.FC<NavItemProps> = ({ currentUser }) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const params = useSearchParams(); // Get the search params from the URL
    const currentUserId = currentUser?.id;

    // Function to handle the "Mes randos" button
    const handleMyPosts = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen(); // Open the login modal if the user is not logged in
            return;
        }
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            user: currentUserId, // Filter the posts by the current user
        };

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery, // Update the query params
            },
            { skipNull: true }
        );
        router.push(url); // Redirect to the updated URL
    }, [currentUserId, params, router, currentUser, loginModal]);

    // Function to handle the "Mes favoris" button
    const handleMyFavorites = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen(); // Open the login modal if the user is not logged in
            return;
        }
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString()); // Parse the current query params
        }
        const updatedQuery: any = {
            favorite: true, // Filter the posts by the favorite posts
        };

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery, // Update the query params
            },
            { skipNull: true }
        );
        router.push(url); // Redirect to the updated URL
    }, [params, router, currentUser, loginModal]);

    return (
        <div
            className="
                border-[1px]
                w-auto
                h-10
                rounded-full
                shadow-sm
                transition
                cursor-pointer
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-end
                    h-full
                    rounded-full
                    
                "
            >
                <div
                    onClick={() => {
                        router.push("/"); // Redirect to the home page
                    }}
                    className="
                        
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        items-center
                        h-full
                        px-2
                        md:px-3
                        lg:px-6
                        hidden
                        sm:flex
                        hover:text-blue-500
                        hover:shadow-md
                    "
                >
                    Toutes les randos
                </div>
                <div
                    onClick={handleMyPosts}
                    className="
                        flex
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        items-center
                        h-full
                        px-2
                        md:px-3
                        lg:px-6
                        hover:text-blue-500
                        hover:shadow-md

                    "
                >
                    Mes randos
                </div>
                <div
                    onClick={handleMyFavorites}
                    className="
                    text-sm
                    font-semibold
                    whitespace-nowrap
                    flex
                    items-center
                    h-full
                    px-2
                    md:px-3
                    lg:px-6
                    rounded-r-full
                    hover:text-blue-500
                    hover:shadow-md
                    sm:border-l-[1px]
                    "
                >
                    Mes favoris
                </div>
            </div>
        </div>
    );
};

const NavItemWithSuspense: React.FC<NavItemProps> = ({ currentUser }) => {
    return (
        <Suspense fallback={<Loading />}>
            <NavItem currentUser={currentUser} />
        </Suspense>
    );
};

export default NavItemWithSuspense;
