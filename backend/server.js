const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "http://api.openweathermap.org/data/2.5";

app.get("/api/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch current weather data" });
  }
});

app.get("/api/forecast/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch forecast data" });
  }
});

app.get("/api/air-pollution/:lat/:lon", async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const response = await axios.get(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch air pollution data" });
  }
});

app.get("/api/uv-index/:lat/:lon", async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const response = await axios.get(
      `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch UV index data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
