import type { Metadata } from "next";
import{ Nunito } from "next/font/google";
import "./globals.css";
//import "/leaflet.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import PageBody from "./components/PageBody";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import PostModal from "./components/modals/PostModal";
import Script from "next/script";



export const metadata: Metadata = {
  title: "Rando App",
  description: "appli de rando",
};


const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({ 
  children, 
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      
      <body className="flex flex-col font-sans" >
        <ToasterProvider />
        <PostModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        <PageBody />
        {/* {children} */}
        <Script src="./script.js"/>
        <script src="./leaflet.js"></script>
        </body>
    </html>
  );
}
