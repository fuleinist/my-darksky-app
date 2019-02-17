import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WeatherView from './WeatherView'

import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from '../reducers';
import rootSaga from '../sagas';

import dummyapi from '../sagas/dummyapi'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

Enzyme.configure({ adapter: new Adapter() });

it('allows us to set props', () => {
    const wrapper = Enzyme.mount(<Provider store={store}><WeatherView city="Sydney" weather=dummyapi.weather /></Provider>);
    expect(wrapper.props().city).to.equal('Sydney');
    wrapper.setProps({ city: 'Adelaide' });
    expect(wrapper.props().city).to.equal('Adelaide');
});