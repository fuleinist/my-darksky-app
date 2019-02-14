import { put, takeLatest, all } from 'redux-saga/effects';
import dummyapi from './dummyapi'

export function* getWeather ({coords}) {
  try {
      const json = dummyapi.weather
      console.log(coords);
      let time = new Date();
      //const json = yield fetch('http://localhost:8000/api/weather/${lat},${lon},${time}').then(response => response.json(), );
      yield put({ type: "WEATHER_RECEIVED", weather: json, });
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