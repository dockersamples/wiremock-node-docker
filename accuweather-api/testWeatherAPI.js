const axios = require('axios');

async function testWeatherAPI() {
  const API_ENDPOINT_BASE = 'http://dataservice.accuweather.com';
  const API_KEY = 'GLC6sUu8otpg7lNAGRrF6to8ZyzJDmyJ'; // Replace with your actual API key
  const townName = 'Bengaluru';

  try {
    const response = await axios.get(`${API_ENDPOINT_BASE}/locations/v1/cities/search`, {
      params: { q: townName, apikey: API_KEY }, // Ensure 'apikey' is included here
    });
    console.log('Data:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('API responded with an error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

testWeatherAPI();

