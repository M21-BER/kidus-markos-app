import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kidusmarkos.kidusmarkoswoodworksapp",
  appName: "Kidus Markos Woodwork",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
      smallIcon:"ic_stat_logo",
      iconColor:'#361705'
    },
  },
};

export default config;
