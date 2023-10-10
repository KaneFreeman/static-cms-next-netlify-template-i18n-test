/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  webpack: (config) => {
    config.module.rules.push(
      ...[
        {
          test: /\.ya?ml$/,
          use: "js-yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ]
    );
    return config;
  },
};

module.exports = withContentlayer(nextConfig);

