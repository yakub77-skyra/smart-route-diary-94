import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fe4d4026cbb94b38a99b4e7e7ab4840c',
  appName: 'smart-route-diary-94',
  webDir: 'dist',
  server: {
    url: 'https://fe4d4026-cbb9-4b38-a99b-4e7e7ab4840c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;