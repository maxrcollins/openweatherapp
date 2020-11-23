
import axios from 'axios';

const OPEN_WEATHER_URLS = {
  find: 'http://api.openweathermap.org/data/2.5/find?', //returns current
  daily: 'https://api.openweathermap.org/data/2.5/onecall?',
};

//find example: http://api.openweathermap.org/data/2.5/find?q=dublin&appid=67fd04927191a42983e665bbb8d50a0f

const API_KEY = '67fd04927191a42983e665bbb8d50a0f'; // TODO Extract into proxy




export const returnCities = (location) => {
  const url = `${OPEN_WEATHER_URLS.find}q=${location}&appid=${API_KEY}`;
  //console.log('url?', url)
  const response = async () => await axios.get(url);
  //console.log('response', response);
  return response();
};

export const handleLocation = (location) => {
  const isCoordinates = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
  if (isCoordinates.test(location)) return location;
  //const isCityCountry = /^[^,]+,[^,]*$/;



  // TODO
  // * take input string from input and shove it in the url
  // * first make weather call to get list of potential cities,
  //   then if one city, make onecall with coords, if several, list them, then make user select before oneCall
  // * hang on to props for second call

  // if (isCityCountry.test(location)) {
  //   console.log('location', location)
  //   const selectedCity = locationData.find((cityData) => {return cityData.name === location});
  //   //console.log({ selectedCity });
  // }
};



export const getWeatherByLocation = (props) => {
  //console.log({props})
  const { lat, lon, language = 'en', metric = 'standard' } = props;

  //const coordinates = location.split(',');
  //console.log({coordinates})
  //const locationCoordinates = handleLocation(location);

  const url = `${OPEN_WEATHER_URLS.daily}&lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${language}&units=${metric}`;

  const response = async () => await axios.get(url);

  return response();
};
