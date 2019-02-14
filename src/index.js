import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import DefaultApp from './components/App';
import rootSaga from './sagas';
import * as serviceWorker from './serviceWorker';

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

render(
  <Provider store={store}>
     <Router>
       <Switch>
        <Route exact path="/" component={DefaultApp}  />
        <Route path="/weather/:location/:day" component={DefaultApp} />
        <Route path="*" component={NotFound}/>
        </Switch>
     </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
