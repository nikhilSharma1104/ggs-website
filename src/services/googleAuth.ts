import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI || '';

const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
];

let authClientInstance: OAuth2Client | null = null;

export const getAuthClient = (): OAuth2Client => {
  if (!authClientInstance) {
    authClientInstance = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
  }

  const token = localStorage.getItem('googleToken');
  if (token && authClientInstance) {
    authClientInstance.setCredentials(JSON.parse(token));
  }

  return authClientInstance;
};

export const authenticateUser = async () => {
  const authClient = getAuthClient();
  const url = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  // Open the auth URL in a new window
  const popup = window.open(url, '_blank', 'width=600,height=600');
};

export const handleAuthCallback = async (code: string) => {
  try {
    const authClient = getAuthClient();
    const { tokens } = await authClient.getToken(code);
    authClient.setCredentials(tokens);

    if (tokens.access_token) {
      localStorage.setItem('googleToken', JSON.stringify(tokens));
    }

    return true;
  } catch (error) {
    console.error('Error handling auth callback:', error);
    return false;
  }
};
