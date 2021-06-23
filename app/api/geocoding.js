// // Geocoding API
// // ~~~~~~~~~~~~~

import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';
import {ApiKeys} from '../constants';
const GeocodingClient = MapboxGeocoding({accessToken: ApiKeys.MAPBOX_TOKEN});
const DirectionsClient = MapboxDirections({accessToken: ApiKeys.MAPBOX_TOKEN});

const getNeighborhood = (context) => context.id.includes('neighborhood');
const getLocality = (context) => context.id.includes('place');
const getRegion = (context) => context.id.includes('region');
const getZip = (context) => context.id.includes('postcode');

export const searchForLocations = async (searchText, userLocation) => {
  const resp = await GeocodingClient.forwardGeocode({
    query: searchText,
    limit: 10,
    proximity: [userLocation.lng, userLocation.lat],
  }).send();
  try {
    const body = resp.body;
    return body;
  } catch (err) {
    console.error(err);
  }
};

export const reverseLookup = async (coords) => {
  const response = await GeocodingClient.reverseGeocode({
    query: [coords[0], coords[1]],
    limit: 1,
  }).send();
  try {
    const features = response.body.features;
    if (features && features.length >= 0 && features[0].context) {
      let region = features[0].context.filter(getRegion)[0].short_code;
      if (region.includes('US-')) {
        region = region.substr(3);
      }
      const locality = features[0].context.filter(getLocality)[0].text;
      const _neighborhood = features[0].context.filter(getNeighborhood)[0];
      const neighborhood = _neighborhood ? _neighborhood.text : locality;
      const streetAddress = features[0].place_name.split(',')[0];
      const zipCode = features[0].context.filter(getZip)[0].text;
      return {
        region,
        locality,
        neighborhood,
        streetAddress,
        zipCode,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

// export async function getDistance(origin, destination) {

// }

export async function getDrivingDirections(origin, dest) {
  const response = await DirectionsClient.getDirections({
    profile: 'driving',
    waypoints: [
      {
        coordinates: origin,
      },
      {
        coordinates: dest,
      },
    ],
  });
  try {
    if (response) {
      return response;
    }
  } catch (err) {
    console.error('error', err);
  }
}
