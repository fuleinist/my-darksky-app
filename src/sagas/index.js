import { put, takeLatest, all } from 'redux-saga/effects';
import dummyapi from './dummyapi'
import {getCoords} from '../components/Functions';		

export function* getWeather ({location}) {
  try {
	  const json = dummyapi.weather;
	  console.log(location)
      if(location) {
		let lat = location.latitude,lng = location.longitude;
		json = yield fetch('http://localhost:8000/api/weather/${key}/${lat},${lng}').then(response => response.json(), );
	  } else {
		let latitude = 0,longitude = 0
		getCoords(coords => {latitude = coords.latitude});
		console.log({latitude,longitude});	
	  }
      let time = new Date();
      yield put({ type: "WEATHER_RECEIVED", weather: json });
      } catch (error) {
          yield put({type: "WEATHER_FETCH_FAILED", error})
      }
}

export function* getLocation() {
  try {
      //local server query to fetch city name, country code, long & lat
      const json = dummyapi.location
      //const json = yield fetch('http://localhost:8000/api/location?longitude=${query}') .then(response => response.json(), );
      yield put({ type: "LOCATION_RECEIVED", location: json, });
      } catch (error) {
          yield put({type: "LOCATION_FETCH_FAILED", error})
      }
}

export function* actionWatcher() {
  yield takeLatest('GET_WEATHER', getWeather)
  yield takeLatest('GET_LOCATION', getLocation)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}