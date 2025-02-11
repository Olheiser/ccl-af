import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
// ! Script  import Script from "next/script"; // Import Script from Next.js
//import CalendlyPopupButton from "./components/CalendlyPopupButton";
import "./globals.css"
import type { Metadata } from "next";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

//import { PopupButton } from "react-calendly";

export const metadata: Metadata = {
  title: "Agent Finder | Request for an appearance platform",
  description: "Need a criminal lawyer to appear for you? We got you covered. Fill out the form and we'll help to arrange an appearance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#bb0000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body id="root">
        <Header />
         {/* <PageHeader title="About" /> */}
        {children}
        <ScrollToTop />
        {/* <CalendlyPopupButton />*/}
        <Footer />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}