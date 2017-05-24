import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Container} from 'reactstrap';;
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import immutable from 'immutable';

import { reducer as formReducer } from 'redux-form/immutable'
import pagosReducers from './reducers/receipt';
import detalleReducers from './reducers/invoice';
import PagosContainer from '../src/containers/PagosContainer'
import AutoFacturador from '../src/components/AutoFacturador'
import DetalleFactura from '../src/components/DetalleFactura'

import { combineReducers } from 'redux-immutablejs';
import  './autoinvoice.css';

const initialState = immutable.Map();

const rootReducer = combineReducers({
  form: formReducer,
  pagos: pagosReducers,
  invoice: detalleReducers,
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
			  <div>
				  <div id="Contenido" >
					<Container>
						{routes.map((route, index) => (
						  <Route
							key={index}
							path={route.path}
							exact={route.exact}
							component={route.main}
						  />
						))}
					</Container>
				  </div>
				</div>
			</App>
		</Router>
	</Provider>,
  document.getElementById('root')
);
