export const FETCHED_PAGOS_FILTER = 'FETCHED_PAGOS_FILTER';

export const fetchPagosFilter = (filter) => (dispatch, getStore) => fetch(`http://localhost:3005/pagos?${filter}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
}).then( result => result.json().then( pagos => dispatch({
	type: FETCHED_PAGOS_FILTER,
	payload: pagos

})));

export default fetchPagosFilter;
