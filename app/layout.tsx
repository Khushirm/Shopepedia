import Navbar from "@/app/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import NextAuthProvider from "./components/NextAuthProvider";
import ToasterProvider from "./components/ToasterProvider";
import ReduxProvider from "@/Redux/providers";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "a store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ReduxProvider>
            <Navbar />
            <ToasterProvider />
            {children}
            <Footer/>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
