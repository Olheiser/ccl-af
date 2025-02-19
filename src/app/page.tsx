import styles from "@/styles/Home.module.css";

// For security
import LeadForm from "./components/LeadForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Finder - Request an Appearance",
  description: "This website is used to find an agent to appear on your behalf. ",
  alternates: {
    canonical: 'https://agentfinder.canadacriminallawyer.ca',
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
