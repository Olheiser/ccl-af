'use client'

import { useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import LeadForm from './components/LeadForm'

// Extend the Window interface to include MSStream
// Define the type for the beforeinstallprompt event


export default function Home() {
  useEffect(() => {
    // Register the service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope)
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return (
    <main className={styles.parentContainer}>
      <section className={styles.bioRow}>
        <h1 className={styles.title}>Request an Appearance</h1>
        <article className={styles.bioContainer}>
          <LeadForm />
        </article>
      </section>
    </main>
  )
}