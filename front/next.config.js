const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = withBundleAnalyzer(
  {
    webpack: config => {
        config.plugins.push(
            new WorkboxPlugin.GenerateSW({
                cacheId: 'workbox',
                swDest: '../public/service-worker.js',
                skipWaiting: true,
                clientsClaim: false,
                exclude:[/json/],
                modifyURLPrefix:{"":"_next/"},
                runtimeCaching: [
                    {
                      urlPattern: /static\//,
                      handler: 'CacheFirst',
                      options: {
                          cacheName: 'js-and-css',
                          expiration: {
                              maxAgeSeconds: 60 * 60 * 24 * 14
                          }
                      }
                  }
                ]
            })
        );

        return config;
    }
}
)

