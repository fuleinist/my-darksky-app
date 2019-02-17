import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';
import './App.css';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from '../reducers';
import rootSaga from '../sagas';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

let NotFound = () => (
  <div>
    <h2>404 NOT FOUND</h2>
  </div>
);

class App extends Component { 
	render() {
		return (
		<Provider store={store}>
			 <Router>
			   <Switch>
				<Route exact path="/" component={() => <Redirect to="/weather/Sydney/Today" /> }  />
				<Route exact path="/weather/:location" component={Main} />
				<Route path="/weather/:location/:day" component={Main} />
				<Route path="*" component={NotFound}/>
				</Switch>
			 </Router>
		</Provider>			 
		)
	}
}

export default App;

