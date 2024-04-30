import type { Metadata } from "next";
import{ Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";



export const metadata: Metadata = {
  title: "Rando App",
  description: "appli de rando",
};


const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <Navbar /> 
        {children}
        </body>
    </html>
  );
}
