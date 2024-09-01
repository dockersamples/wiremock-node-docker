# Mocking API services in development and testing with Wiremock

This repo contains the sample application for [Mocking API services in development and testing with Wiremock](https://github.com/dockersamples/wiremock-node-docker) guide on Docker Docs. In this guide, you'll build a simple weather dashboard application using React for the frontend and Node.js for the backend. The app will fetch weather data based on user input, allowing users to see current weather conditions for various cities. To simulate the weather API, you'll use WireMock, enabling us to mock API responses during development and testing.

Notice: This sample repo is intended to support the guide mentioned above. As such, the application code is purposely kept simple to keep the focus on the guide's content and should not be considered production-ready.

## Tech Stack




### Frontend: 
- **React**: A powerful JavaScript library for building user interfaces, particularly single-page applications (SPAs).
- **Vite**: A modern build tool that provides a fast development environment, leveraging native ES modules for better performance during development.

### Backend: 
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building scalable server-side applications.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Testing: 
- **WireMock**: A tool for mocking HTTP services, allowing you to simulate API responses and test your application without relying on real external APIs.



## Project Structure

- **/backend**: Contains your Node.js backend code, including routes, controllers, and any other server-side logic. This is where your API endpoints are defined, and where the backend interacts with WireMock to fetch mocked data.
- **/frontend**: Contains your React frontend code, including components, styling, and any assets. This is the user interface where users can input data, such as the city name, to retrieve weather information.
- **/wiremock**: Contains your WireMock setup, including mappings and response files. This directory is used to define the mocked API responses that the backend interacts with during development and testing.


## Development

- Docker Desktop
- Node (LTS version)
- A basic knowledge of React



## 1. Clone the repository:

```
git clone https://github.com/ajeetraina/wiremock-node-docker
```

## 2. Navigate into the project

```
cd wiremock-node-docker
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





