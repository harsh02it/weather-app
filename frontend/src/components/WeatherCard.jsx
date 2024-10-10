import React from "react";

function WeatherCard({ title, value, bgColor, textColor, capitalize = false }) {
  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p
        className={`text-2xl font-bold ${textColor} ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default WeatherCard;
