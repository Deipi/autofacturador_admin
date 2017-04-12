import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import immutable from 'immutable';

import { reducer as formReducer } from 'redux-form/immutable'
import pagosReducers from './reducers/pagos';

import { combineReducers } from 'redux-immutablejs';

const initialState = immutable.Map();

const rootReducer = combineReducers({
	form: formReducer,
	pagos: pagosReducers,
});
const store = createStore(rootReducer,initialState, applyMiddleware(thunk));



ReactDOM.render(
	<Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root')
);
