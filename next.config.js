/** @type {import('next').NextConfig} */
// Plugins
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Imports
const { i18n } = require('./next-i18next.config');

// Notes: 
/**
 * Analzer: https://www.npmjs.com/package/@next/bundle-analyzer
 */
const nextConfig = {
  webpack(config, { isServer }) {
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })
    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    return config
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  pwa: {
    dest: 'public'
  }
}

module.exports = withPlugins([
  withBundleAnalyzer,
  withPWA
], nextConfig)
