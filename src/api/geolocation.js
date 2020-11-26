


export default function getGeoLocation(callbackFunction, errorCallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callbackFunction, errorCallback);
  }
  else {
    log.debug('load failed');
  }
}
