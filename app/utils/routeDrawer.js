import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import ApiKeys from '../constants/apiKeys';

const clientOptions = {accessToken: ApiKeys.MAPBOX_TOKEN};
const directionsClient = MapboxDirectionsFactory(clientOptions);

export {directionsClient};
