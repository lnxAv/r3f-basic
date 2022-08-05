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
