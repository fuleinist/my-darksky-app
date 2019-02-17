import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import App from './App';
import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';


import { mount } from 'enzyme';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Provider store={store}>
	  <Router>
		  <Route exact path="/weather/:location/:day" component={App} />
	  </Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});


