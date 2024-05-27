"use client";

import { useState } from "react";
import { useCallback } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import usePostModal from "@/app/hooks/usePostModal";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const postModal = usePostModal();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value); // Toggle the state of the menu (open/close)
    }, [setIsOpen]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="
                        p-2.5
                        md:{py-1 px-2}
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu /> {/* Hamburger button */}
                </div>
                {isOpen && ( // Display the menu if the state is open
                    <div
                        className="
                            absolute
                            rounded-xl
                            shadow-md
                            bg-white
                            w-[170px]                            
                            overflow-hidden
                            right-0
                            top-16
                            text-sm
                            border-[1px]
                        "
                    >
                        <div className="flex flex-col cursor-pointer">
                            {currentUser ? (
                                <>
                                    {/* <MenuItem
                                        onClick={() => router.push("/account")} // Redirect to the account page
                                        label="Votre compte"
                                        className="border-b-[1px]"
                                    /> */}
                                    {/* <MenuItem
                                        onClick={() => {}} // No settings page yet
                                        label="Paramètres"
                                        className="border-b-[1px]"
                                    /> */}
                                    <MenuItem
                                        onClick={() => {
                                            router.push("/");
                                            postModal.onOpen;
                                        }} // Open the post modal to create a post
                                        label="Créez une randonnée"
                                        className="border-b-[1px]"
                                    />
                                    <MenuItem
                                        onClick={() => {
                                            // Sign out the user
                                            console.log("Déconnexion");
                                            signOut({
                                                callbackUrl:
                                                    "http://trek.cluster-ig3.igpolytech.fr/",
                                            });
                                        }}
                                        label="Se déconnecter"
                                    />
                                </>
                            ) : (
                                <>
                                    {" "}
                                    {/* If the user is not logged in */}
                                    <MenuItem
                                        onClick={loginModal.onOpen}
                                        label="Login"
                                        className="border-b-[1px]"
                                    />
                                    <MenuItem
                                        onClick={registerModal.onOpen}
                                        label="Sign up"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;
