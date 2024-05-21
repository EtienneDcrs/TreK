import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import PostModal from "./components/modals/PostModal";

export const metadata: Metadata = {
    title: "My Rando App",
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
                <ToasterProvider />
                {/* <PostModal /> */}
                <LoginModal />
                <RegisterModal />
                <Navbar currentUser={currentUser} />

                <div>{children}</div>
            </body>
        </html>
    );
}
