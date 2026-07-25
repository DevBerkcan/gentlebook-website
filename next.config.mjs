/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Three.js & drei werden nur client-seitig geladen (dynamic import, ssr:false).
  transpilePackages: ["three"],
};

export default nextConfig;
