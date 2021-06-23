// Drives Async Actions
// ~~~~~~~~~~~~~~~~~~~~
// import * as Sentry from '@sentry/react-native';
// import { drives as DrivesApi } from '@commaai/comma-api';
// import * as Geocoding from '../../api/geocoding';
import * as DrivesApi from '../api/drives';

// import {
//   drivesReset,
//   drivesFetchStarted,
//   drivesFetchFailed,
//   routesFetched,
//   routeGeocodeFetched,
// } from '../Drives';

export const fetchDrives = async (dongleId) => {
  if (!dongleId) return;
  let routes = await DrivesApi.fetchRoutes(
    dongleId,
    Date.now() - 86400 * 14 * 1000,
    Date.now(),
  );
  return routes;
  // }).catch((err) => {
  //   Sentry.captureException(err);
  //   console.log('drivesFetch failed', dongleId, err);
  //   dispatch(drivesFetchFailed(dongleId));
  // });
};

// export const geocodeRoute = (route, force = false) => {
//   let { start, end } = (getState().drives.routeGeocodes[route.route] || {});
//   if (force || !start) {
//     try {
//       start = await Geocoding.reverseLookup(route.startCoord);
//       // dispatch(routeGeocodeFetched(route, start));
//     } catch(err) {
//       // Sentry.captureException(err);
//       console.log('could not fetch start geocode', route.route, err);
//     }
//   }
//   if (force || !end) {
//     try {
//       end = await Geocoding.reverseLookup(route.endCoord);
//       // dispatch(routeGeocodeFetched(route, start, end));
//     } catch(err) {
//       // Sentry.captureException(err);
//       console.log('could not fetch end geocode', route.route, err);
//     }
//   }
//   // TODO fix this function
//   return {route, start, end};
// }
