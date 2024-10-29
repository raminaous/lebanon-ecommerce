/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com", // Allow images from Firebase Storage
      "play-lh.googleusercontent.com", // Allow images from Google Play
      // Add any other domains you want to allow here
    ],
  },
};

export default nextConfig;
