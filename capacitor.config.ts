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
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: false,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
      smallIcon:"ic_stat_logo",
      iconColor:'#361705'
    },
  },
};

export default config;
