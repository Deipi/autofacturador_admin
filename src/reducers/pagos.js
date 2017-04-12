import { fromJS } from 'immutable';
import { FETCHED_PAGOS } from '../actions/pagos';

export default (state=fromJS([]), action) => {
	switch(action.type) {
		case FETCHED_PAGOS:
			return fromJS(action.payload);
		default:
			return state;
	}
}