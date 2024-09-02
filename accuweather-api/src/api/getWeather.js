const express = require("express");
require("dotenv").config();
const axios = require("axios");

const router = express.Router();
const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const USE_WIREMOCK = process.env.USE_WIREMOCK === 'true';

router.get("/", async (req, res) => {
  const townName = req.query.city;
  let weatherData;

  try {
    if (USE_WIREMOCK) {
      // Fetch data from WireMock running on port 8080
      const response = await axios.get(`http://localhost:8080/api/v1/getWeather?city=${townName}`);
      weatherData = response.data;
    } else {
      // Fetch data from the real AccuWeather API
      const locationResponse = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${townName}&details=false`
      );
      const locationKey = locationResponse.data[0].Key;

      const currentConditionsResponse = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}.json?apikey=${ACCUWEATHER_API_KEY}`
      );
      const currentConditions = currentConditionsResponse.data[0];

      const forecastsResponse = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}`
      );
      const forecasts = forecastsResponse.data.DailyForecasts;

      // Format the weather data
      weatherData = {
        city: townName,
        temperature: currentConditions.Temperature.Metric.Value,
        conditions: currentConditions.WeatherText,
        forecasts: forecasts.map((forecast) => ({
          date: forecast.Date,
          temperature: forecast.Temperature.Maximum.Value,
          conditions: forecast.Day.IconPhrase,
        })),
      };
    }

    res.send(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;

