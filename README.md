# Mocking API services in development and testing with Wiremock

This repo contains the sample application for [Mocking API services in development and testing with Wiremock](https://github.com/dockersamples/wiremock-node-docker) guide on Docker Docs. In this guide, you'll build a simple weather dashboard application using React for the frontend and Node.js for the backend. The app will fetch weather data based on user input, allowing users to see current weather conditions for various cities. To simulate the weather API, you'll use WireMock, enabling us to mock API responses during development and testing.

Notice: This sample repo is intended to support the guide mentioned above. As such, the application code is purposely kept simple to keep the focus on the guide's content and should not be considered production-ready.

## Tech Stack



Frontend: React
Backend: Node.js, Express
API: Wiremock


## Project Structure

- **/backend**: Contains your Node.js backend code, including routes, controllers, and any other server-side logic. This is where your API endpoints are defined, and where the backend interacts with WireMock to fetch mocked data.
- **/frontend**: Contains your React frontend code, including components, styling, and any assets. This is the user interface where users can input data, such as the city name, to retrieve weather information.
- **/wiremock**: Contains your WireMock setup, including mappings and response files. This directory is used to define the mocked API responses that the backend interacts with during development and testing.
