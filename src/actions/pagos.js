import qs from 'qs';
export const FETCHED_PAGOS = 'FETCHED_PAGOS';
export const FETCHED_PAGOSFILTERC = 'FETCHED_PAGOSFILTERC';


export const fetchPagos = () => (dispatch, getStore) => fetch('http://localhost:3005/pagos', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
}).then( result => result.json().then( pagos => dispatch({
	type: FETCHED_PAGOS,
	payload: pagos
})));

export const fetchPagosFilterc = (filter) => (dispatch, getStore) => fetch(`http://localhost:3005/pagos?${qs.stringify(filter)}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
}).then( result => result.json().then( pagos => dispatch({
	type: FETCHED_PAGOSFILTERC,
	payload: pagos

})));
