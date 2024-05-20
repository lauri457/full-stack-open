import axios from "axios";
const apikey = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apikey}&`

const getWeather = (city) => {
  return axios.get(`${baseUrl}q=${city}`).then((request) => request.data);
};

export default { getWeather };
