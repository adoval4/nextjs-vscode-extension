// webview-ui/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    distDir: 'dist', // Change this to 'dist'
    images: {
      unoptimized: true, // Since image optimization isn't needed
    },
    basePath: '',
};

module.exports = nextConfig;