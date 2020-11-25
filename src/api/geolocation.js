


export default function getGeoLocation(callbackFunction) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callbackFunction);
  }
  else {
    // Handle
    console.log('load failed ');
  }
}
