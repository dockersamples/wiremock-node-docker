require("dotenv").config();

const express = require("express");
const axios = require("axios");

const router = express.Router();
const API_ENDPOINT_BASE = process.env.API_ENDPOINT_BASE;
const API_KEY = process.env.ACCUWEATHER_API_KEY;

console.log('API_ENDPOINT_BASE:', API_ENDPOINT_BASE);  // Log after it's defined
console.log('ACCUWEATHER_API_KEY is set:', !!API_KEY); // Log boolean instead of actual key

if (!API_ENDPOINT_BASE) {
  throw new Error("API_ENDPOINT_BASE is not defined in environment variables");
}

// Only check for API key if not using WireMock
if (API_ENDPOINT_BASE !== 'http://localhost:8080' && !API_KEY) {
  throw new Error("ACCUWEATHER_API_KEY is not defined in environment variables");
}

// Function to fetch the location key for the city
async function fetchLocationKey(townName) {
  const { data: locationData } = await axios.get(`${API_ENDPOINT_BASE}/locations/v1/cities/search`, {
    params: { q: townName, details: false, apikey: API_KEY },
  });
  return locationData[0]?.Key;
}

// Function to fetch current conditions
async function fetchCurrentConditions(locationKey) {
  const { data: currentConditionsData } = await axios.get(`${API_ENDPOINT_BASE}/currentconditions/v1/${locationKey}`, {
    params: { apikey: API_KEY },
  });
  return currentConditionsData[0];
}

// Function to fetch 5-day forecast
async function fetchForecasts(locationKey) {
  const { data: forecastsData } = await axios.get(`${API_ENDPOINT_BASE}/forecasts/v1/daily/5day/${locationKey}`, {
    params: { apikey: API_KEY },
  });
  return forecastsData.DailyForecasts;
}

router.get("/", async (req, res) => {
  const townName = req.query.city;

  if (!townName) {
    return res.status(400).send("City query parameter is required");
  }

  try {
    // If using WireMock, call the mock endpoint directly
    if (API_ENDPOINT_BASE.includes('localhost')) {
      const { data } = await axios.get(`${API_ENDPOINT_BASE}/api/v1/getWeather`, {
        params: { city: townName },
      });
      return res.send(data);
    }

    // Fetch location key for the city
    const locationKey = await fetchLocationKey(townName);

    if (!locationKey) {
      return res.status(404).send(`City "${townName}" not found`);
    }

    // Fetch current conditions and 5-day forecast
    const [currentConditions, forecasts] = await Promise.all([
      fetchCurrentConditions(locationKey),
      fetchForecasts(locationKey),
    ]);

    // Format the weather data
    const weatherData = {
      city: townName,
      temperature: currentConditions?.Temperature?.Metric?.Value || 'N/A',
      conditions: currentConditions?.WeatherText || 'N/A',
      forecasts: forecasts ? forecasts.map(forecast => ({
        date: forecast.Date,
        temperature: forecast.Temperature.Maximum.Value,
        conditions: forecast.Day.IconPhrase,
      })) : [],
    };

    res.send(weatherData);
  } catch (error) {
    if (error.response) {
      console.error('API responded with an error:', error.response.status, error.response.data);
      return res.status(error.response.status).send(`Error fetching weather data: ${error.response.data.Message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received from API:', error.request);
      return res.status(503).send("No response received from weather service");
    } else {
      console.error('Error setting up the request:', error.message);
      return res.status(500).send("Error fetching weather data");
    }
  }
});

module.exports = router;
