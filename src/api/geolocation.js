


export default function getGeoLocation(callbackFunction) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callbackFunction);
  }
  else {
    log.debug('load failed');
  }
}
