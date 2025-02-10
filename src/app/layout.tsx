import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
// ! Script  import Script from "next/script"; // Import Script from Next.js
//import CalendlyPopupButton from "./components/CalendlyPopupButton";
import "./globals.css"
import type { Metadata } from "next";

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
        {/* Google Tag (gtag.js) 
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-653876065"
          strategy="afterInteractive" // Ensures script runs after page load
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive" // Runs after the page becomes interactive
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-653876065');
            `,
          }}
        />*/}
      </head>
      <body id="root">
        <Header />
         {/* <PageHeader title="About" /> */}
        {children}
        <ScrollToTop />
        {/* <CalendlyPopupButton />*/}
        <Footer />
      </body>
    </html>
  );
}