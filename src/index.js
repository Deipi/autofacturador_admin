import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import immutable from 'immutable';

import { reducer as formReducer } from 'redux-form/immutable'
import pagosReducers from './reducers/receipt';
import PagosContainer from '../src/containers/PagosContainer'
import AutoFacturador from '../src/components/AutoFacturador'
import DetalleFactura from '../src/components/DetalleFactura'

import { combineReducers } from 'redux-immutablejs';


const initialState = immutable.Map();

const rootReducer = combineReducers({
  form: formReducer,
  pagos: pagosReducers,
});

const store = createStore(rootReducer,initialState, applyMiddleware(thunk));

const routes = [

  { path: '/',
	exact: true,
	sidebar: () => <div>home!</div>,
	main: () =>  <PagosContainer/>
  },
  { path: '/AutoFacturador',
	sidebar: () => <div>shoelaces!</div>,
	main: () => <AutoFacturador/>
  },
  { path: '/receipts/:code',
	sidebar: () => <div>detalle!</div>,
	main:DetalleFactura,
  }
]

ReactDOM.render(
	<Provider store={ store }>
		<Router>
			<App>
			  <div style={{ display: 'flex' }}>
				  <div id="Contenido" >
					{routes.map((route, index) => (
					  <Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.main}
					  />
					))}
				  </div>
				</div>
			</App>
		</Router>
	</Provider>,
  document.getElementById('root')
);