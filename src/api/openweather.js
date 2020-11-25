
import axios from 'axios';

const OPEN_WEATHER_URLS = {
  find: 'http://api.openweathermap.org/data/2.5/find?', //returns current
  data: 'https://api.openweathermap.org/data/2.5/onecall?',
};

const API_KEY = '67fd04927191a42983e665bbb8d50a0f'; // TODO make env variable. Don't hard code


export const getDataByQuery = async (location) => {
  const url = `${OPEN_WEATHER_URLS.find}q=${location}&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response;
};



export const getDataByCoordinates = async (props) => {
  const { lat, lon, metric = 'standard' } = props;

  const url = `${OPEN_WEATHER_URLS.data}&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${metric}`;

  const response = await axios.get(url);

  return response;
};
