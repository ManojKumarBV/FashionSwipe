import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fashionswipe.app",
  appName: "Fashion Swipe",
  webDir: "dist",
  server: {
    url: "http://192.168.1.4:8080/",
    cleartext: true,
  },
  ios: {},
  android: {},
};

export default config;
