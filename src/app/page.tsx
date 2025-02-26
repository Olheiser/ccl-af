'use client'

import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import LeadForm from './components/LeadForm'

// Extend the Window interface to include MSStream
declare global {
  interface Window {
    MSStream?: unknown
  }
}

// Define the type for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

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

  useEffect(() => {
    // Detect if the user is on a mobile device
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    setIsMobile(isMobileDevice)

    // Detect if the app is running in standalone mode
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    })
  }, [])

  const handleInstallPrompt = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }

  return (
    <main className={styles.parentContainer}>
      <section className={styles.bioRow}>
        <h1 className={styles.title}>Request an Appearance</h1>
        <article className={styles.bioContainer}>
          <LeadForm />
        </article>
      </section>

      {isMobile && !isStandalone && (
        <div className="pwa-install-prompt">
          <h3 className="pwa-install-prompt__title">Install App</h3>
          <button className="pwa-install-prompt__button" onClick={handleInstallPrompt}>
            Add to Home Screen
          </button>
        </div>
      )}
    </main>
  )
}