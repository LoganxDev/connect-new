import urlJoin from 'url-join';
// import ConfigRequestPromise from './config-request-promise';
import * as fetchWrapper from './fetchWrapper';
import {VIDEO_HOST} from './config';

const getServerBaseUrl = (routeSigUrl, videoServerHost) => {
  if (!videoServerHost) {
    videoServerHost = VIDEO_HOST;
  }
  let [dongleId, routeSignature] = routeSigUrl.split('/').slice(5, 7);
  return videoServerHost + '/hls/' + dongleId + '/' + routeSignature + '/';
};

export const getRearCameraStreamIndexUrl = (routeSigUrl) => {
  let baseUrl = getServerBaseUrl(serverUrl);
  return urlJoin(baseUrl, 'index.m3u8');
};

export const getFrontCameraStreamIndexUrl = (routeSigUrl) => {
  let baseUrl = getServerBaseUrl(serverUrl);
  return urlJoin(baseUrl, 'dcamera/index.m3u8');
};

export const getQcameraStreamIndexUrl = (routeSigUrl) => {
  return urlJoin(routeSigUrl, 'qcamera.m3u8?t=' + Date.now());
};

export default videoApi = (routeSigUrl, videoServerHost) => {
  if (!videoServerHost) {
    videoServerHost = VIDEO_HOST;
  }
  let [dongleId, routeSignature] = routeSigUrl.split('/').slice(5, 7);

  // const videoserverRequest = ConfigRequestPromise();
  const videoserverBaseUrl =
    videoServerHost + '/hls/' + dongleId + '/' + routeSignature + '/';
  // videoserverRequest.configure({
  //   baseUrl: videoserverBaseUrl,
  //   parse: null,
  // });
  // const storageRequest = ConfigRequestPromise();
  // storageRequest.configure({
  //   baseUrl: routeSigUrl + '/',
  //   parse: null,
  // });

  return {
    getRearCameraStreamIndex: function () {
      return fetchWrapper.get(videoserverBaseUrl + 'index.m3u8');
    },
    getFrontCameraStreamIndexPath: function () {
      return fetchWrapper.get('dcamera/index.m3u8');
    },
    getQcameraStreamIndex: function (max) {
      return fetchWrapper.get('qcamera.m3u8?t=' + Date.now());
    },
  };
};
