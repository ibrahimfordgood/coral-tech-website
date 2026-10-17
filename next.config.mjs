/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile in the home folder confuses root detection; pin it here.
  turbopack: { root: import.meta.dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["@node-rs/argon2"],
}

export default nextConfig
