import React from "react";
import WeatherCard from "./WeatherCard";

function CurrentWeather({ weather }) {
  if (!weather) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Current Weather in {weather.name}
      </h2>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <WeatherCard
          title="Temperature"
          value={`${weather.main.temp}°C`}
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <WeatherCard
          title="Description"
          value={weather.weather[0].description}
          bgColor="bg-green-100"
          textColor="text-green-800"
          capitalize
        />
        <WeatherCard
          title="Humidity"
          value={`${weather.main.humidity}%`}
          bgColor="bg-yellow-100"
          textColor="text-yellow-800"
        />
        <WeatherCard
          title="Wind Speed"
          value={`${weather.wind.speed} m/s`}
          bgColor="bg-red-100"
          textColor="text-red-800"
        />
      </div>
    </div>
  );
}

export default CurrentWeather;
