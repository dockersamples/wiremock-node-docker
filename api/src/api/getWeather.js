const express = require("express");
require("dotenv").config();
const axios = require("axios");

const router = express.Router();
const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;

// Function to create stubs on WireMock server
async function createWeatherStub() {
  try {
    await axios.post('http://localhost:8080/__admin/mappings', {
      request: {
        method: 'GET',
        urlPath: '/api/v1/getWeather',
        queryParameters: {
          city: {
            equalTo: 'Bengaluru'
          }
        }
      },
      response: {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          city: 'Bengaluru',
          temperature: 25,
          conditions: 'Clear Sky'
        })
      }
    });
    console.log('Stub created successfully!');
  } catch (error) {
    console.error('Failed to create stub:', error);
  }
}

// Call this function once, probably at server startup
createWeatherStub();

router.get("/", async (req, res) => {
  const townName = req.query.city;
  let locationKey;
  let weatherData;

  try {
    // Get location key for the given city
    const locationResponse = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${townName}&details=false`
    );
    console.log('Location Response:', locationResponse.data); // Add this line to print the response
    locationKey = locationResponse.data[0].Key;

    // Get current conditions for the location key
    const currentConditionsResponse = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}.json?apikey=${ACCUWEATHER_API_KEY}`
    );
    const currentConditions = currentConditionsResponse.data[0];

    // Get daily forecasts for the location key
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

    res.send(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;