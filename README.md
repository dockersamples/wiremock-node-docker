# Mocking API services in development and testing with Wiremock

This repo contains the sample application for [Mocking API services in development and testing with Wiremock](https://github.com/dockersamples/wiremock-node-docker) guide on Docker Docs. This project first demonstrates how to integrate the AccuWeather API with a Node.js server to fetch and display weather data for a given city. To simulate the weather API, you'll use WireMock that enables you to mock API responses during development and testing.


## Project Overview

This project is divided into two main steps:

**1. AccuWeather API Integration:**
- Test the integration between your Node.js server and the AccuWeather API to ensure that your server correctly makes requests to the AccuWeather API and handles the responses.

**2. Mocking with WireMock:**
- Use WireMock to mock the AccuWeather API by creating a stub response. This allows you to test your Node.js server without making actual requests to the AccuWeather API.



**Notice:** This sample repo is intended to support the guide mentioned above. As such, the application code is purposely kept simple to keep the focus on the guide's content and should not be considered production-ready.

## Tech Stack



- Node.js: A JavaScript runtime environment for building server-side applications.
- Express: A popular web application framework for Node.js.
- Axios: A promise-based HTTP client for making requests to external APIs.
- Dotenv: A zero-dependency module that loads environment variables from a `.env` file.
- WireMock: A tool for stubbing and mocking HTTP requests during testing.


## Development

- Docker Desktop
- Node (LTS version)



## 1. Clone the repository:

```
git clone https://github.com/ajeetraina/wiremock-node-docker
```

## 2. Navigate into the project directory

```
cd wiremock-node-docker/accuweather-api
```

## 3. Install dependencies

```
npm install
```

## 4. Create a `.env` file

Create a `.env` file in the root directory of the project and add your AccuWeather API key:

```
ACCUWEATHER_API_KEY=2gzXXXXXXXBWnZU
```

## 5. Run the project

```
npm run start
```

You should see the following output:


```

> express-api-starter@1.2.0 start
> node src/index.js

Listening: http://localhost:5000
Stub created successfully!
```

Keep this terminal window open.

## 6. Testing the application

Open a new terminal and run the following `curl` command to test the application:

```
curl "http://localhost:5000/api/v1/getWeather?city=Bengaluru"
```

The response should look like this:

```
{"city":"Bengaluru","temperature":27.1,"conditions":"Mostly cloudy","forecasts":[{"date":"2024-09-02T07:00:00+05:30","temperature":83,"conditions":"Partly sunny w/ t-storms"},{"date":"2024-09-03T07:00:00+05:30","temperature":83,"conditions":"Thunderstorms"},{"date":"2024-09-04T07:00:00+05:30","temperature":83,"conditions":"Intermittent clouds"},{"date":"2024-09-05T07:00:00+05:30","temperature":82,"conditions":"Dreary"},{"date":"2024-09-06T07:00:00+05:30","temperature":82,"conditions":"Dreary"}]}%
```

Switch back to the terminal where you ran npm run start and you will see the following output:

```
Location Response: [
  {
    Version: 1,
    Key: '204108',
    Type: 'City',
    Rank: 11,
    LocalizedName: 'Bengaluru',
    EnglishName: 'Bengaluru',
    PrimaryPostalCode: '',
    Region: { ID: 'ASI', LocalizedName: 'Asia', EnglishName: 'Asia' },
    Country: { ID: 'IN', LocalizedName: 'India', EnglishName: 'India' },
    AdministrativeArea: {
      ID: 'KA',
      LocalizedName: 'Karnataka',
      EnglishName: 'Karnataka',
      Level: 1,
      LocalizedType: 'State',
      EnglishType: 'State',
      CountryID: 'IN'
    },
    TimeZone: {
      Code: 'IST',
      Name: 'Asia/Kolkata',
      GmtOffset: 5.5,
      IsDaylightSaving: false,
      NextOffsetChange: null
    },
    GeoPosition: { Latitude: 12.991, Longitude: 77.579, Elevation: [Object] },
    IsAlias: false,
    SupplementalAdminAreas: [ [Object] ],
    DataSets: [
      'AirQualityCurrentConditions',
      'AirQualityForecasts',
      'Alerts',
      'FutureRadar',
      'MinuteCast',
      'PremiumAirQuality'
    ]
  }
]
GET /api/v1/getWeather?city=Bengaluru 200 1690.639 ms - 500
```




## 3. Running Wiremock in a Docker container

WireMock acts as the mock API that your backend will communicate with to retrieve data. The mock API responses have already been created for you in the mappings directory.


## 1. Navigate to the `wiremock-endpoint` directory:

```
cd wiremock-endpoint
```

## 2. Run the Wiremock service:

```
docker compose up -d
```

Verify if the WireMock container is running via Docker Dashboard.

<img width="1448" alt="image" src="https://github.com/user-attachments/assets/d5fef122-cf6a-4d33-b2bc-334da30cf56d">


## 3. Check the logs using the Docker Dashboard


<img width="1491" alt="image" src="https://github.com/user-attachments/assets/15772786-071a-4082-95eb-56b9b99d448e">


## 5. Testing the mock APIs

```
curl http://localhost:8080/api/v1/getWeather\?city\=Bengaluru
```



The response should be:

```
curl http://localhost:8080/api/v1/getWeather\?city\=Bengaluru
{"city":"Bengaluru","temperature":27.1,"conditions":"Mostly cloudy","forecasts":[{"date":"2024-09-02T07:00:00+05:30","temperature":83,"conditions":"Partly sunny w/ t-storms"},{"date":"2024-09-03T07:00:00+05:30","temperature":83,"conditions":"Thunderstorms"},{"date":"2024-09-04T07:00:00+05:30","temperature":83,"conditions":"Intermittent clouds"},{"date":"2024-09-05T07:00:00+05:30","temperature":82,"conditions":"Dreary"},{"date":"2024-09-06T07:00:00+05:30","temperature":82,"conditions":"Dreary"}]}%
```


## 6. Connecting non-containers Nodejs to a containerised Wiremock 

Based on your getWeather.js file, here's how you can adjust your Node.js server to toggle between fetching data from the real AccuWeather API and using the mocked responses provided by WireMock.


```
git checkout node-wiremock
```

## 7. Setting up environment variable

To switch between real and mocked API calls, you simply set USE_WIREMOCK=true in your environment:

```
export USE_WIREMOCK=true
```

## 8. Starting the Node application


```
npm run start
```

## 9. Testing the Mock API

```
curl "http://localhost:5000/api/v1/getWeather?city=Bengaluru"

{"city":"Bengaluru","temperature":27.1,"conditions":"Mostly cloudy","forecasts":[{"date":"2024-09-02T07:00:00+05:30","temperature":83,"conditions":"Partly sunny w/ t-storms"},{"date":"2024-09-03T07:00:00+05:30","temperature":83,"conditions":"Thunderstorms"},{"date":"2024-09-04T07:00:00+05:30","temperature":83,"conditions":"Intermittent clouds"},{"date":"2024-09-05T07:00:00+05:30","temperature":82,"conditions":"Dreary"},{"date":"2024-09-06T07:00:00+05:30","temperature":82,"conditions":"Dreary"}]}%
```


In the first step, you tested the integration between your Node.js server and the AccuWeather API, confirming that your server correctly handles requests and responses. In the second step, you used WireMock to mock the AccuWeather API, allowing you to test your server without making real API requests.

