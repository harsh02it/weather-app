import React, { useState } from "react";
import axios from "axios";
import WeatherSearch from "./components/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import AirPollution from "./components/AirPollution";
import UVIndex from "./components/UVIndex";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center text-gray-900">
                Comprehensive Weather App
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <WeatherSearch
                  city={city}
                  setCity={setCity}
                  fetchWeatherData={fetchWeatherData}
                />
                <CurrentWeather weather={weather} />
                <Forecast forecast={forecast} />
                <AirPollution airPollution={airPollution} />
                <UVIndex uvIndex={uvIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
