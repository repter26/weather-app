import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./WeatherCard.css";

function WeatherCard({ advisories, weatherData, crop }) {
  console.log(advisories, weatherData);
  if (!advisories || !weatherData) return null;

  const chartData = weatherData?.list
    ? weatherData.list.slice(0, 8).map((entry, idx) => ({
        time: `+${idx * 3}h`,
        temperature: (entry.main.temp - 273.15).toFixed(1),
        precipitation: entry.rain ? entry.rain["3h"] || 0 : 0,
      }))
    : [];

  return (
    <div className="weather-card">
      <h2 className="title">Crop Advisory for {crop}</h2>

      <ul className="advisory-list">
        {advisories.map((advice, i) => (
          <li key={i} className="advisory-item">
            {advice}
          </li>
        ))}
      </ul>

      <h3 className="subtitle">Weather Forecast (Next 24h)</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Temp (°C)") return [`${value} °C`, "Temperature"];
                if (name === "Rain (mm)")
                  return [`${value} mm`, "Precipitation"];
                return [value, name];
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              name="Temp (°C)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="precipitation"
              stroke="#0077ff"
              name="Rain (mm)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeatherCard;
