'use client';

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import usePostModal from "@/app/hooks/usePostModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
    currentUser?: SafeUser | null;

};


const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const postModal = usePostModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    },[ isOpen, setIsOpen]);

    return(
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
                    <AiOutlineMenu />
                </div>
                {isOpen && (
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
                        <div
                            className="flex flex-col cursor-pointer"
                        >
                            {currentUser ? (
                                <>
                                    <MenuItem 
                                        onClick={() => console.log("Mon compte")}
                                        label="Votre compte"
                                        className="border-b-[1px]"
                                    />
                                    <MenuItem 
                                        onClick={() => console.log("Paramètres")}
                                        label="Paramètres"
                                        className="border-b-[1px]"
                                    />
                                    <MenuItem 
                                        onClick={postModal.onOpen}
                                        label="Créez une randonnée"
                                        className="border-b-[1px]"
                                    />
                                    <MenuItem 
                                        onClick={() => {signOut()}}
                                        label="Se déconnecter"
                                    />
                                </>
                            ) : (     
                                <>
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