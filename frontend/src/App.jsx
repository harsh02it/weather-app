// src/App.js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airPollution, setAirPollution] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `http://localhost:5000/api/forecast/${city}`
      );
      setForecast(forecastResponse.data);

      const { coord } = weatherResponse.data;
      const airPollutionResponse = await axios.get(
        `http://localhost:5000/api/air-pollution/${coord.lat}/${coord.lon}`
      );
      setAirPollution(airPollutionResponse.data);

      const uvIndexResponse = await axios.get(
        `http://localhost:5000/api/uv-index/${coord.lat}/${coord.lon}`
      );
      setUvIndex(uvIndexResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Comprehensive Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeatherData}>Get Weather Data</button>

      {weather && (
        <div>
          <h2>Current Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {forecast && (
        <div>
          <h2>5-Day Forecast</h2>
          <ul>
            {forecast.list
              .filter((item, index) => index % 8 === 0)
              .map((day, index) => (
                <li key={index}>
                  Date: {day.dt_txt}, Temp: {day.main.temp}°C, Description:{" "}
                  {day.weather[0].description}
                </li>
              ))}
          </ul>
        </div>
      )}

      {airPollution && (
        <div>
          <h2>Air Pollution</h2>
          <p>Air Quality Index: {airPollution.list[0].main.aqi}</p>
          <p>CO: {airPollution.list[0].components.co} μg/m³</p>
          <p>NO2: {airPollution.list[0].components.no2} μg/m³</p>
          <p>O3: {airPollution.list[0].components.o3} μg/m³</p>
          <p>PM2.5: {airPollution.list[0].components.pm2_5} μg/m³</p>
        </div>
      )}

      {uvIndex && (
        <div>
          <h2>UV Index</h2>
          <p>Current UV Index: {uvIndex.value}</p>
        </div>
      )}
    </div>
  );
}

export default App;
