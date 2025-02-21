module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com; " +
              "script-src 'self' 'unsafe-eval' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com; " +
              "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com; " +
              "img-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com data:; " +
              "style-src 'self' 'unsafe-inline' https://*.googleapis.com; " +
              "font-src 'self' https://*.gstatic.com;",
          },
        ],
      },
      {
        source: '/sw.js', // Apply to the service worker file
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};