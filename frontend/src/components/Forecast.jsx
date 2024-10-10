import React from "react";

function Forecast({ forecast }) {
  if (!forecast) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">5-Day Forecast</h2>
      <div className="mt-2 space-y-2">
        {forecast.list
          .filter((item, index) => index % 8 === 0)
          .map((day, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
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
  );
}

export default Forecast;
