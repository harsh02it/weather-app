import React from "react";

function AirPollution({ airPollution }) {
  if (!airPollution) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Air Pollution</h2>
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
  );
}

export default AirPollution;
