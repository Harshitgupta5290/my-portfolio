import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const PreloaderWrapper = dynamic(() => import("./components/helper/preloader-wrapper"), { ssr: false });

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Portfolio of Harshit Gupta - Senior Product Engineer",
  description:
    "This is the portfolio of Harshit Gupta. I am a Senior Product Engineer specialized in architecting and scaling production-grade SaaS platforms, backend architecture, and AI-driven product development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <PreloaderWrapper />
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
