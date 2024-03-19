/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["*"],
    domains: [
      "books.google.com",
      "marketplace.canva.com",
      "lh3.googleusercontent.com",
      "w7.pngwing.com",
      "encrypted-tbn0.gstatic.com",
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**",
    //   },
    // ],
  },
};

module.exports = nextConfig;

// remotePatterns: [
//   {
//     protocol: "*",
//     hostname: "*",
//   },
// ],
