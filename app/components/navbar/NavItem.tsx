'use client';

import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";

const NavItem = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    },[ isOpen, setIsOpen]);

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
                    Onglet 2
                </div>
                <div
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
                    Onglet 2 bis
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
                        <div
                            className="flex flex-col cursor-pointer"
                        >
                            <>
                                <MenuItem 
                                    onClick={() => console.log("Clicked")}
                                    label="Onglet 2"
                                    className={"border-b-[1px] "}
                                    />
                                <MenuItem 
                                    onClick={() => console.log("Clicked")}
                                    label="Onglet 2 bis"

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
