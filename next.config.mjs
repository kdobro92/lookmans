/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KAKAO_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY
  }
};

export default nextConfig;
