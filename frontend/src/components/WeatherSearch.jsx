import React from "react";

function WeatherSearch({ city, setCity, fetchWeatherData }) {
  return (
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
  );
}

export default WeatherSearch;
