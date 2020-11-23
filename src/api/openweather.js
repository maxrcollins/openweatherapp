
import axios from 'axios';

const OPEN_WEATHER_URLS = {
  find: 'http://api.openweathermap.org/data/2.5/find?', //returns current
  daily: 'https://api.openweathermap.org/data/2.5/onecall?',
};

const API_KEY = '67fd04927191a42983e665bbb8d50a0f'; // TODO Extract into proxy


export const getDataByQuery = (location) => {
  const url = `${OPEN_WEATHER_URLS.find}q=${location}&appid=${API_KEY}`;
  const response = async () => await axios.get(url);
  return response();
};



export const getDataByCoordinates = (props) => {
  const { lat, lon, language = 'en', metric = 'standard' } = props;

  const url = `${OPEN_WEATHER_URLS.daily}&lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${language}&units=${metric}`;

  const response = async () => await axios.get(url);

  //console.log({response()})

  return response();
};
