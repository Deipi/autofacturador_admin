import { fromJS } from 'immutable';
import { FETCHED_PAGOS } from '../actions/receipt';
import { FETCHED_PAGOS_FILTER } from '../actions/filters';

export default (state=fromJS([]), action) => {
	switch(action.type) {
		case FETCHED_PAGOS:
		case FETCHED_PAGOS_FILTER:
			return fromJS(action.payload);
		default:
			return state;
	}
}
