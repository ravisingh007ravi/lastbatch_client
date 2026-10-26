import React from 'react';
import { GoogleOAuthProvider, GoogleLogin as BaseGoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '598002585301-v0tneko671kfqlajht244dqme0h2ertp.apps.googleusercontent.com';

export function GoogleAuthProvider({ children, clientId = GOOGLE_CLIENT_ID }) {
  if (!clientId) { console.warn('Google Client ID is missing. Please set VITE_GOOGLE_CLIENT_ID in your .env file.'); }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}

export const GoogleLogin = BaseGoogleLogin;

export default GoogleAuthProvider;
