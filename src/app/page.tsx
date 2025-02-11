import styles from "@/styles/Home.module.css";

// For security
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
  
  return (

    <main className={styles.parentContainer}>
      <section className={styles.bioRow}>
        <h1 className={styles.title}>Request an Appearance</h1>
        
        <article className={styles.bioContainer}>
          <LeadForm />
        </article>
      </section>
    </main>
    
  );
}
