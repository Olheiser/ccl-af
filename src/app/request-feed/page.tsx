import React from "react"
import styles from "@/styles/RequestFeed.module.css";
import Appearance from "../components/Appearance";
import Filter from "../components/Filter";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agent Finder | Request Feed",
    description: "Nicholas Robinson is a trusted criminal lawyer in Regina, Saskatchewan, offering personalized and strategic criminal defence services. Call (306) 994-8323 for a free consultation today.",
  };

  
export default function Page() {
    return (
        <main className={styles.pageBody}>
            <div className={styles.pageContainer}>
                <article className={styles.pageContent}>
                    <h1 className={styles.title}>Appearance Requests</h1>
                    <Appearance />
                </article>
                <aside className={styles.form}>
                    <Filter />
                </aside>
            </div>
        </main>
    )
}