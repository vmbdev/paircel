import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'xyz.hippolyta.paircel',
  appName: 'Paircel',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
