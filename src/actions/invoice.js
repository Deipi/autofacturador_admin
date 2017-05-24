export const FETCHED_DETALLE = 'FETCHED_DETALLE';

export const fetchDetalle = () => (dispatch, getStore) => fetch('http://localhost:3006/invoice', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
}).then( result => result.json().then( invoice => dispatch({
	type: FETCHED_DETALLE,
	payload: invoice
})));
