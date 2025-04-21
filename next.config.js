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
      "www.google.com",
      "d1csarkz8obe9u.cloudfront.net",
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**",
    //   },
    //   {
    //     protocol: "http",
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
