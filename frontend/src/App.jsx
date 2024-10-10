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
                <div className="flex items-center space-x-4">
                  <input
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                  />
                  <button
                    onClick={fetchWeatherData}
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Search
                  </button>
                </div>

                {weather && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Current Weather in {weather.name}
                    </h2>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Temperature</p>
                        <p className="text-2xl font-bold text-blue-800">
                          {weather.main.temp}°C
                        </p>
                      </div>
                      <div className="bg-green-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-xl font-semibold text-green-800 capitalize">
                          {weather.weather[0].description}
                        </p>
                      </div>
                      <div className="bg-yellow-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Humidity</p>
                        <p className="text-2xl font-bold text-yellow-800">
                          {weather.main.humidity}%
                        </p>
                      </div>
                      <div className="bg-red-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Wind Speed</p>
                        <p className="text-2xl font-bold text-red-800">
                          {weather.wind.speed} m/s
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {forecast && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900">
                      5-Day Forecast
                    </h2>
                    <div className="mt-2 space-y-2">
                      {forecast.list
                        .filter((item, index) => index % 8 === 0)
                        .map((day, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-lg"
                          >
                            <p className="text-sm font-semibold text-gray-600">
                              {new Date(day.dt * 1000).toLocaleDateString()}
                            </p>
                            <p className="text-lg font-bold text-gray-800">
                              {day.main.temp}°C, {day.weather[0].description}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {airPollution && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Air Pollution
                    </h2>
                    <div className="mt-2 bg-purple-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Air Quality Index</p>
                      <p className="text-2xl font-bold text-purple-800">
                        {airPollution.list[0].main.aqi}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <p className="text-sm text-gray-600">
                          CO:{" "}
                          <span className="font-semibold">
                            {airPollution.list[0].components.co} μg/m³
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          NO2:{" "}
                          <span className="font-semibold">
                            {airPollution.list[0].components.no2} μg/m³
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          O3:{" "}
                          <span className="font-semibold">
                            {airPollution.list[0].components.o3} μg/m³
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          PM2.5:{" "}
                          <span className="font-semibold">
                            {airPollution.list[0].components.pm2_5} μg/m³
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {uvIndex && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900">
                      UV Index
                    </h2>
                    <div className="mt-2 bg-orange-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Current UV Index</p>
                      <p className="text-2xl font-bold text-orange-800">
                        {uvIndex.value}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
