import styles from "@/styles/Home.module.css";

// For security
import { headers } from 'next/headers'
import Script from 'next/script'
import LeadForm from "./components/LeadForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Finder - Request an Appearance",
  description: "Looking for a trusted criminal lawyer in Regina? Nicholas Robinson provides expert criminal defence for all criminal charges. Call now for a free consultation and protect your rights.",
  alternates: {
    canonical: 'https://reginacriminallawyer.ca',
  }
};

export default async function Home() {
  

  const nonce = (await headers()).get('x-nonce')

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://reginacriminallawyer.ca/",
    "url": "https://reginacriminallawyer.ca/",
    "name": "Regina Criminal Lawyer - Nicholas Robinson",
    "image": "https://imagedelivery.net/8au6u53Ph6mHP5o5AhlVXQ/7ee63c63-b679-4850-e564-11c72c526c00/public",
    "datePublished": "2024-12-20T00:00:00+00:00",
    "dateModified": "2024-12-20T00:00:00+00:00",
    "description": "Nicholas Robinson is a trusted Regina Criminal Lawyer specializing in expert legal defence for criminal charges, including impaired driving (DUI), assault, sexual assault, drug offences, and fraud. As a dedicated criminal defence lawyer in Regina, Nicholas fights to protect your rights and deliver the best possible outcome. Contact (306) 994-8323 today for a free consultation.",
    "inLanguage": "en-CA",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Nicholas Robinson Regina Criminal Lawyer",
      "url": "https://reginacriminallawyer.ca/"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://reginacriminallawyer.ca/"
        }
      ]
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "@id": "https://reginacriminallawyer.ca/#primaryImage",
      "url": "https://imagedelivery.net/8au6u53Ph6mHP5o5AhlVXQ/972ce4b7-c9a2-4003-3b1d-fd55da8c7800/public",
      "contentUrl": "https://imagedelivery.net/8au6u53Ph6mHP5o5AhlVXQ/972ce4b7-c9a2-4003-3b1d-fd55da8c7800/public",
      "caption": "Nicholas Robinson, Regina Criminal Lawyer, providing specialized criminal defence services.",
      "width": 1150,
      "height": 645
    },
    "mainEntity": {
      "@type": "LegalService",
      "@id": "https://reginacriminallawyer.ca/#LegalService",
      "name": "Nicholas Robinson Regina Criminal Lawyer",
      "alternateName": "N.P. Robinson Law Professional Corporation",
      "url": "https://reginacriminallawyer.ca/",
      "logo": "https://imagedelivery.net/8au6u53Ph6mHP5o5AhlVXQ/7ee63c63-b679-4850-e564-11c72c526c00/public",
      "image": "https://imagedelivery.net/8au6u53Ph6mHP5o5AhlVXQ/7ee63c63-b679-4850-e564-11c72c526c00/public",
      "telephone": "+1-306-994-8323",
      "description": "Nicholas Robinson, a leading Regina Criminal Lawyer, provides expert criminal defence for all criminal charges, including impaired driving (DUI), sexual assault, assault, drug offences, and fraud. With a proven track record of success in Regina courts, Nicholas Robinson ensures strong, personalized representation to protect your rights. Contact +1-306-994-8323 for a free consultation today.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2010 11th Ave Unit 701, Royal Bank Building",
        "addressLocality": "Regina",
        "addressRegion": "SK",
        "postalCode": "S4P 0J3",
        "addressCountry": "CA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "@id": "https://reginacriminallawyer.ca/#ContactPoint",
        "telephone": "+1-647-697-2876",
        "contactType": "customer service",
        "contactOption": ["TollFree", "HearingImpairedSupported"],
        "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Saskatchewan"
        },
        {
          "@type": "City",
          "name": "Regina"
        }
      ],
        "availableLanguage": ["en", "fr", "de", "uk"]
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "61"
      },
      "serviceArea": [
      {
        "@type": "AdministrativeArea",
        "name": "Saskatchewan"
      },
      {
        "@type": "City",
        "name": "Regina"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.4480",
      "longitude": "-104.6178",
      "name": "Nicholas Robinson Law Office - Regina"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://reginacriminallawyer.ca/#DUIDefence",
          "name": "DUI/DWI Defence",
          "description": "Facing DUI or impaired driving charges in Regina? Nicholas Robinson provides expert DUI/DWI defence to protect your driving record and minimize penalties. Call for a strong legal defence today."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Drug Charges",
          "@id": "https://reginacriminallawyer.ca/#DrugCharges",
          "description": "Accused of drug offences in Regina? Get experienced legal defence for possession, trafficking, and drug-related charges. Nicholas Robinson will fight to protect your rights and your future."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://reginacriminallawyer.ca/#AssaultDefence",
          "name": "Assault Charges",
          "description": "Charged with assault in Regina? Nicholas Robinson offers strategic legal defence for assault charges, including simple assault, aggravated assault, and domestic violence. Protect your reputation and freedom."
        }
      }
    ],
    "knowsAbout": [
      "Criminal Defence Law",
      "DUI/DWI Defence",
      "Drug Offences",
      "Assault Charges",
      "Fraud Cases",
      "Youth Criminal Justice Act"
    ],
    "sameAs": [
      "https://g.co/kgs/84UGZ9c", 
      "https://www.facebook.com/nicholasrobinsoncriminallawyer/", 
      "https://www.linkedin.com/company/nicholas-robinson-criminal-lawyer",
      "https://maps.app.goo.gl/r27eSnDYZdJn7g8Q6"
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://calendly.com/nicholas-robinson-criminal-lawyer/free-consultation"
      },
      "description": "Schedule a free consultation with Nicholas Robinson, a Regina Criminal Lawyer."
    }
    }
  }
  
  return (
    <>
    {nonce && ( 
        <Script 
          strategy="afterInteractive" 
          nonce={nonce} 
        />
      )}
    <main className={styles.parentContainer}>
      <section className={styles.bioRow}>
        <h1 className={styles.title}>Request an Appearance</h1>
        
        <article className={styles.bioContainer}>
          <LeadForm />
        </article>
      </section>
    </main>
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
