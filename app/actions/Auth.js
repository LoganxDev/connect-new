// Auth API
// ~~~~~~~~

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  account as Account,
  // athena as Athena,
  auth as CommaAuth,
  // request as Request,
} from '@commaai/comma-api';

import errorHandler from '../api/errorHandler';
import * as Auth from '../api/auth';
import * as Billing from '../api/billing';
import * as Devices from '../api/devices';
import * as Athena from '../api/athena';
import * as Drives from '../api/drives';

const configureApis = async (accessToken) => {
  Devices.setToken(accessToken);
  console.log('Devices configured');
  Athena.setToken(accessToken);
  console.log('Athena configured');
  Drives.setToken(accessToken);
  console.log('Drives configured');
  // await Billing.configure(accessToken);
  Billing.setToken(accessToken);
  console.log('Billing configured');
};

export const signIn = async () => {
  try {
    // await refreshTerms();

    await Auth.signOut();
    const googleUser = await Auth.attemptGoogleAuth();
    const accessToken = await CommaAuth.refreshAccessToken(
      googleUser.serverAuthCode,
    );
    await configureApis(accessToken, errorHandler());
    let commaUser = await Account.getProfile();
    commaUser.accessToken = accessToken;
    // console.log({googleUser, commaUser});

    if (googleUser != null && commaUser != null) {
      return {commaUser, googleUser};
    } else {
      console.error('wtf');
      return {};
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (err) {
    console.log(err);
  }
};

export const rehydrateAuth = async () => {
  const storedAuth = await AsyncStorage.getItem('user');
  if (storedAuth === null || storedAuth === undefined) {
    console.log('failed to refresh profile on launch');
    return;
  }
  let {commaUser, googleUser} =
    storedAuth !== null && storedAuth !== undefined
      ? JSON.parse(storedAuth)
      : null;
  // const launchArgs = getLaunchArguments();
  // const jwtArgIdx = launchArgs.findIndex(arg => arg === '-jwt');

  // await dispatch(refreshTerms());

  let jwt;
  if (commaUser) {
    // Sentry.setUser({
    //   id: commaUser.id,
    //   username: commaUser.username,
    // });
    // Segment.identify(commaUser.id, { username: commaUser.username });
    jwt = commaUser.accessToken;
  } else if (jwtArgIdx !== -1) {
    // dispatch(termsAccepted(getState().auth.terms.version));
    // jwt = launchArgs[jwtArgIdx + 1];
  }

  if (jwt) {
    await configureApis(
      jwt,
      errorHandler(() => {
        console.log('test');
      }),
    );
    try {
      // commaUser = await Account.getProfile();
      // console.log(commaUser);
    } catch (err) {
      console.log('failed to refresh profile on launch', err);
      return {
        isAuthenticating: false,
        authError: null,
        commaUser: null,
        googleUser: null,
        user: null,
        acceptedTermsVersion: 0,
        terms: null,
      };
    }

    commaUser.accessToken = jwt;
    // dispatch(authSucceeded({commaUser, googleUser}));
  }

  return {
    commaUser,
    googleUser,
  };
};

// export function signOut() {
//   return async (dispatch, getState) => {
//     try {
//       NavigationService.navigate('Auth');
//       XMLHttpRequest.prototype.nukeAll();
//       dispatch(authReset());
//       dispatch(resetDevices());
//       dispatch(resetDrives());
//       await Auth.signOut();
//       await configureApis(null);
//     } catch(error) {
//       Sentry.captureException(error);
//       console.error(error);
//       console.log('signOut failed', error);
//     }
//   }
// }

// export function refreshTerms() {
//   return async (dispatch) => {
//     console.log('refreshTerms')
//     try {
//       const resp = await fetch('https://chffrdist.blob.core.windows.net/connect/terms.json?t=' + Date.now());
//       const terms = (await resp.json());
//       console.log({terms})
//       dispatch(termsRefreshed(terms));
//       console.log('terms refreshed');
//     } catch(error) {
//       console.log('Failed to fetch terms', error);
//     }
//   }
// }
