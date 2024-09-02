# Mocking API services in development and testing with Wiremock

This repo contains the sample application for [Mocking API services in development and testing with Wiremock](https://github.com/dockersamples/wiremock-node-docker) guide on Docker Docs. This project first demonstrates how to integrate the AccuWeather API with a Node.js server to fetch and display weather data for a given city. To simulate the weather API, you'll use WireMock, enabling us to mock API responses during development and testing.


Notice: This sample repo is intended to support the guide mentioned above. As such, the application code is purposely kept simple to keep the focus on the guide's content and should not be considered production-ready.

## Tech Stack



- Node.js: A JavaScript runtime environment for building server-side applications.
- Express: A popular web application framework for Node.js.
- Axios: A promise-based HTTP client for making requests to external APIs.
- Dotenv: A zero-dependency module that loads environment variables from a `.env` file.
- WireMock: A tool for stubbing and mocking HTTP requests during testing.


## Development

- Docker Desktop
- Node (LTS version)
- A basic knowledge of React



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

## 4. Create .env file

Create a `.env` file in the root directory of the project and add your AccuWeather API key:

```
ACCUWEATHER_API_KEY=2gzXXXXXXXBWnZU
```

## 5. Run the project

```
npm run start
```



```

> express-api-starter@1.2.0 start
> node src/index.js

Listening: http://localhost:5000
Stub created successfully!
```

Keep this terminal window open.

## 6. Testing the application

Open a new terminal and test it with curl command:

```
curl "http://localhost:5000/api/v1/getWeather?city=Bengaluru"
```

It should show the following result:

```
{"city":"Bengaluru","temperature":27.1,"conditions":"Mostly cloudy","forecasts":[{"date":"2024-09-02T07:00:00+05:30","temperature":83,"conditions":"Partly sunny w/ t-storms"},{"date":"2024-09-03T07:00:00+05:30","temperature":83,"conditions":"Thunderstorms"},{"date":"2024-09-04T07:00:00+05:30","temperature":83,"conditions":"Intermittent clouds"},{"date":"2024-09-05T07:00:00+05:30","temperature":82,"conditions":"Dreary"},{"date":"2024-09-06T07:00:00+05:30","temperature":82,"conditions":"Dreary"}]}%
```

Switch to the other terminal where you run `npm run start` and you will see the following response:


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

Mock API responses is already created for you. A directory called mapping is used to store your Wiremock mappings.

WireMock acts as the mock API that your backend will communicate with to retrieve data. It needs to be running before the backend so that when the backend makes API calls, those calls can be intercepted by WireMock

```
docker run --rm -d -p 8080:8080 --name wiremock -v $PWD/wiremock:/home/wiremock wiremock/wiremock
```

You will see the following logs in the Docker Dashboard:

<img width="1492" alt="image" src="https://github.com/user-attachments/assets/23488fed-d320-4eec-b160-150a2ad79c4b">


View the container logs:

<img width="1507" alt="image" src="https://github.com/user-attachments/assets/489173aa-23af-4685-abe0-65f7c7f8de65">



## 4. Start the backend

```
cd backend
npm install
node app.js
```

The backend server should start and listen on `http://localhost:5000`

## 5. Start the frontend

```
cd frontend
npm run dev
```

The frontend development server should start and be accessible at `http://localhost:5173`.

```
 VITE v5.4.2  ready in 152 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```

<img width="306" alt="image" src="https://github.com/user-attachments/assets/5ce452ba-a100-4d12-a0be-80251205ed2a">


## 6. Testing the Backend integration

Now that WireMock is working correctly, test the integration between your backend (Node.js) and WireMock. You can do this by making a request to your backend:


```
curl http://localhost:5000/weather/Bangalore
```

This request should trigger your backend to make a request to WireMock and return the mocked weather data to the frontend.

```
{"city":"Mocked City","temperature":25,"humidity":60,"condition":"Clear skies"}
```

The response indicates that your entire setup is working correctly. 

## 7. Testing the frontend Integration

Once the backend is working as expected, ensure that the frontend (React) correctly fetches and displays the weather data.
Visit your React application at `http://localhost:5173`, enter "Bangalore" as the city, and click "Get Weather." 
The frontend should display the same weather data you see in the terminal.





