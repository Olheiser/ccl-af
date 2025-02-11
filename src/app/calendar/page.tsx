// pages/CalendarPage.tsx
"use client";

import React from "react";
import styles from "@/styles/Calendar.module.css";
import Calendar from "../components/Calendar/Calender";

export default function Page() {
  return (
    <main className={styles.pageBody}>
      <div className={styles.pageContainer}>
        <Calendar />
      </div>
    </main>
  );
}