// Auth API
// ~~~~~~~~

import {GoogleSignin} from '@react-native-community/google-signin';

// Configure Google Auth
let configured = false;
export const configureGoogleAuth = () => {
  if (configured) return;

  GoogleSignin.configure({
    webClientId:
      '45471411055-ornt4svd2miog6dnopve7qtmh5mnu6id.apps.googleusercontent.com',
    offlineAccess: true,
  });
  configured = true;
};

export const isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  return isSignedIn;
};

// Attempt Google Auth
export const attemptGoogleAuth = async () => {
  await ensureGoogleAuthReady();

  const googleUser = await GoogleSignin.signIn();
  return googleUser;
};

// Terminate Google Auth
export const signOut = async () => {
  await ensureGoogleAuthReady();

  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (err) {
    console.log(err);
  }
};

ensureGoogleAuthReady = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  configureGoogleAuth();
};
