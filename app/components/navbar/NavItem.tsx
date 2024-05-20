"use client";

import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface NavItemProps {
    currentUser: any;
}

const NavItem: React.FC<NavItemProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [isOpen, setIsOpen]);

    const router = useRouter();
    const params = useSearchParams();
    const currentUserId = currentUser?.id;
    const handleMyPosts = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            user: currentUserId,
        };

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );
        router.push(url);
    }, [currentUserId, params, router]);

    const handleMyFavorites = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            favorite: true,
        };

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );
        router.push(url);
    }, [currentUserId, params, router]);

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
                        router.push("/");
                    }}
                    className="
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        flex
                        items-center
                        h-full
                        px-6
                        md:px-3
                        lg:px-6
                        rounded-l-full
                        hover:text-blue-500
                        hover:shadow-md
                    "
                >
                    Toutes les randos
                </div>
                <div
                    onClick={handleMyPosts}
                    className="
                        hidden
                        sm:flex
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        px-6
                        md:px-3
                        lg:px-6
                        border-x-[1px]
                        h-full
                        items-center
                        hover:text-blue-500
                        hover:shadow-md

                    "
                >
                    Mes randos
                </div>
                <div
                    onClick={handleMyFavorites}
                    className="
                        hidden
                        sm:flex
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        px-6
                        md:px-3
                        lg:px-6
                        border-x-[1px]
                        h-full
                        items-center
                        hover:text-blue-500
                        hover:shadow-md

                    "
                >
                    Mes favoris
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        flex
                        items-center
                        h-full
                        px-6
                        md:px-3
                        lg:px-6
                        rounded-r-full
                        hover:text-blue-500
                        hover:shadow-md
                        border-l-[1px]
                    "
                >
                    Autre
                </div>
                {isOpen && (
                    <div
                        className="
                            absolute
                            rounded-xl
                            shadow-md
                            bg-white
                            w-[200px]                            
                            overflow-hidden
                            top-[82px]
                            text-sm
                            sm:hidden
                            border-[1px]
                        "
                    >
                        <div className="flex flex-col cursor-pointer">
                            <>
                                <MenuItem
                                    onClick={handleMyPosts}
                                    label="Mes randos"
                                    className={"border-b-[1px] "}
                                />
                                <MenuItem
                                    onClick={handleMyFavorites}
                                    label="Mes favoris"
                                />
                            </>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavItem;
