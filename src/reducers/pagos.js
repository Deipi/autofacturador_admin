import { fromJS } from 'immutable';
import { FETCHED_PAGOS , FETCHED_PAGOSFILTER, FETCHED_PAGOSFILTERC,FETCHED_PAGOSFILTERF} from '../actions/pagos';

export default (state=fromJS([]), action) => {
	switch(action.type) {
		case FETCHED_PAGOS:
		case FETCHED_PAGOSFILTERC:
			return fromJS(action.payload);
		default:
			return state;
	}
}