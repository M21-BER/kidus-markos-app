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
      launchAutoHide: false,
      showSpinner: true,
      backgroundColor: "#ffffffff",
      spinnerColor: "#361705",
      splashFullScreen: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      androidScaleType: "CENTER_CROP",
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
      smallIcon:"ic_stat_logo",
      iconColor:'#361705'
    },
  },
};

export default config;
