import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fashionswipe.app",
  appName: "Fashion Swipe",
  webDir: "dist",
  server: {
    url: "https://fashion-swipe.vercel.app/",
    cleartext: true,
  },
  ios: {},
  android: {},
};

export default config;
  