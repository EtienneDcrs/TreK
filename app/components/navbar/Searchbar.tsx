'use client';

import { BiSearch } from "react-icons/bi";

const Searchbar = () => {

    return (
        <div className="hidden md:flex searchbar flex-row items-center justify-between">
            <input 
                className="
                    shadow-sm 
                    hover:shadow-md
                    w-[150px]
                    lg:w-[250px]
                    border-[1px] 
                    rounded-[5px]
                    px-2 
                    py-2
                    " 
                type="text" 
                placeholder="Enter something" />
            <div
                className="
                    p-2
                    mx-2    
                    border-[1px]
                    rounded-full
                    hover:shadow-md
                "
            >
                <BiSearch size={20} />
            </div>
        </div>
    );
};

export default Searchbar;