import type { Metadata } from "next";
import{ Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import PageBody from "./components/PageBody";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";



export const metadata: Metadata = {
  title: "Rando App",
  description: "appli de rando",
};


const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="flex flex-col font-sans" >
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar />
        <PageBody />
        {/* {children} */}
        </body>
    </html>
  );
}
