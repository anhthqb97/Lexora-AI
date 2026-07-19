import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  disableLogger: true,
});
