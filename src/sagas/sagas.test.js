import { put, takeLatest } from 'redux-saga/effects';
import { getWeather, actionWatcher } from './index.js';

describe('testing sagas - actionWatcher', () => {
    let generator = null;
    beforeEach(() => {
       generator = actionWatcher();
    });
    const actionType = 'GET_WEATHER';

    test('should wait for the proper action - GET_WEATHER 1', () => {
        put({ type: actionType });
        const actual = generator.next();

        expect(actual.value).toEqual(takeLatest(actionType, getWeather));
    });
	
	test('should wait for the actionToWait action - GET_WEATHER 2', () => {
	const actionToWait = () => ({ type: actionType });
	const actual = generator.next(actionToWait());

	expect(actual.value).toEqual(takeLatest(actionType, getWeather));
	});

});