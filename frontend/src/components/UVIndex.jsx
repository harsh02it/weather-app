import React from "react";

function UVIndex({ uvIndex }) {
  if (!uvIndex) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">UV Index</h2>
      <div className="mt-2 bg-orange-100 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Current UV Index</p>
        <p className="text-2xl font-bold text-orange-800">{uvIndex.value}</p>
      </div>
    </div>
  );
}

export default UVIndex;
