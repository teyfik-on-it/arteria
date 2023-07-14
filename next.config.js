const defaultLocale = 'en';

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale,
    locales: [defaultLocale, 'tr'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
