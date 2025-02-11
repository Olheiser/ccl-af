import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Agent Finder | Canada Criminal Lawyer',
    short_name: 'Agent Finder',
    description: 'Request court appearances through a simple interface.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#bb0000',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}