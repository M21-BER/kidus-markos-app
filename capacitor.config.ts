import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kidusmarkos.kidusmarkoswoodworksapp',
  appName: 'kidus Markos WoodWorks',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    // LocalNotifications: {
    //   smallIcon: 'ic_stat_icon_config_sample',
    //   iconColor: '#CE0B7C',
    // },
    PushNotifications: {
      presentationOptions: ['alert', 'sound'],
    },
  },
};

export default config;
