import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import ApiKeys from '../constants/apiKeys';

const clientOptions = {accessToken: ApiKeys.MAPBOX_TOKEN};
const directionsClient = MapboxDirectionsFactory(clientOptions);

export const requestDirections = async (origin, destination) => {
  const reqOptions = {
    waypoints: [{coordinates: origin}, {coordinates: destination}],
    profile: 'driving',
    geometries: 'geojson',
    // steps: true
  };

  const res = await directionsClient.getDirections(reqOptions).send();
  return res.body;
};
