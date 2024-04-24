'use client';

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useCallback } from "react";
import MenuItem from "./MenuItem";

const Menu = () => {

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
                            w-[150px]                            
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
                            <>
                                <MenuItem 
                                    onClick={() => console.log("Clicked")}
                                    label="login"
                                    className="border-b-[1px]"
                                />
                                <MenuItem 
                                    onClick={() => console.log("Clicked")}
                                    label="home"
                                />
                            </>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;