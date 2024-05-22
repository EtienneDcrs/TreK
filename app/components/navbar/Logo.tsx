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
            className="block cursor-pointer"
            height="50"
            width="50"
            src="/images/logo.png"
        />
    );
};

export default Logo;
