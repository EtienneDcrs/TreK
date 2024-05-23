import type { Metadata } from "next";
import { Nunito } from "next/font/google";
//import ToasterProvider from "./providers/ToasterProvider";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { getCurrentUser } from "./actions/getCurrentUser";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";

export const metadata: Metadata = {
    title: "TR≡K",
    description: "application de randonnée",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="fr">
            <body className="flex flex-col font-sans">
                <Toaster />
                <LoginModal />
                <RegisterModal />
                <Navbar currentUser={currentUser} />

                <div>{children}</div>
            </body>
        </html>
    );
}
