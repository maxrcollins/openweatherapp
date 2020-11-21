
import axios from 'axios'

const API_KEY = '67fd04927191a42983e665bbb8d50a0f'

export const getWeatherByLocation = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

  const response = async () => await axios.get(url)
  console.log('response', response)
  return response()
}
