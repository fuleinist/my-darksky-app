My weather forcast app using darksky api and (WIP)google geo coder

A weather forcast app that implements the Dark Sky API using react redux saga. You can review the follow the build instructions for local use.

The app uses a express server to bypass the Cross Origin Resource Sharing (CORS) issue for development and testing

### Build Instructions

You can also clone this repository to your computer by pasting 
`git clone git@github.com:fuleinist/my-darksky-app.git` in a terminal window

. Once that is done, please follow these steps:
- `npm install --save` (this will install the dependencies)
- `npm test` (to ensure the app is successfully passing tests and linting)
-  Move to /server folder and run `npm test` (this serves the express server on localhost:8000)
- `npm start` (this serves the app on localhost:3000)

### Routing

- Display a weather forecast by location 
	Expected URL: /weather/:location
	Example URL: /weather/( sydney | brisbane ) 

- Display a weather forecast by location filtered by day
	Expected URL : /weather/:location/:weekday
	Example URL: /weather/:location/( monday | tuesday | etc .. )

- Display a weather forecast for today
	Expected URL: /weather/:location/today
	Example URL: weather/sydney/today

### Interactions
- Search and Select World cities using Autocomplete
- Press days on WeatherList to swtich between day

<hr />

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.