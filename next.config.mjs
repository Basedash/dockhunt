// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      // Twitter profile images
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/profile_images/**",
      },
      // Twitter default profile image
      {
        protocol: "https",
        hostname: "abs.twimg.com",
        pathname: "/sticky/**",
      },
      // App icons in DigitalOcean bucket
      {
        protocol: "https",
        hostname: "dockhunt-images.nyc3.cdn.digitaloceanspaces.com",
        pathname: "/*",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default config;
