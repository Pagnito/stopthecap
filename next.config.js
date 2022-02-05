const withPWA = require('next-pwa');
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com']
  },
  pwa: {
    dest: "public",
    swSrc: "service-worker.js",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
   
      config.experiments = {};
      config.experiments.topLevelAwait = true;

  
    // Important: return the modified config
    return config
  },
}

