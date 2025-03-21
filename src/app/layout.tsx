import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SignUpHeader from "./components/SignUpHeader";
// ! Script  import Script from "next/script"; // Import Script from Next.js
//import CalendlyPopupButton from "./components/CalendlyPopupButton";
import "./globals.css"
import type { Metadata } from "next";
//import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
//import { Roboto } from 'next/font/google';

//import { PopupButton } from "react-calendly";

/*const roboto = Roboto({
  weight: ['400', '700'], // Specify the font weights you need
  subsets: ['latin'], // Specify the subsets you need
  display: 'swap', // Ensure the font is loaded with a fallback
});*/

export const metadata: Metadata = {
  title: "Agent Finder - Request an Appearance",
  description: "Need a criminal lawyer to appear for you? We got you covered. Fill out the form and we'll help to arrange an appearance.",
  alternates: {
    canonical: 'https://agentfinder.canadacriminallawyer.ca',
  },
   manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#bb0000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body id="root">
        <Header />
        <SignUpHeader />
         {/* <PageHeader title="About" /> */}
        {children}
        <ScrollToTop />
        {/* <CalendlyPopupButton />*/}
        <Footer />
        {/*<ServiceWorkerRegistration />*/}
      </body>
    </html>
  );
}