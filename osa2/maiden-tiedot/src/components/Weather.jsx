import { useEffect } from "react";
import weatherService from "../services/weather";
import { useState } from "react";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    weatherService
      .getWeather(city)
      .then((weatherObj) => setWeather(weatherObj));
  }, []);
  console.log(weather)
  if (!weather.main) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/>

      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
