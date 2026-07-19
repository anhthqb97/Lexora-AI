import type { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Lexora AI",
  slug: "lexora-ai",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "lexora",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.lexora.ai",
    buildNumber: "1",
  },
  android: {
    adaptiveIcon: { backgroundColor: "#1e3a5f" },
    package: "com.lexora.ai",
    versionCode: 1,
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
    eas: { projectId: process.env.EAS_PROJECT_ID ?? "00000000-0000-0000-0000-000000000000" },
  },
  plugins: ["expo-router", "expo-secure-store", "expo-notifications"],
  experiments: { typedRoutes: true },
});
