"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// component that renders the logo
const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push("/")} // Redirect to home page
            alt="logo"
            className="block cursor-pointer rounded-full"
            height="50"
            width="50"
            src="/images/TreK.png"
        />
    );
};

export default Logo;
