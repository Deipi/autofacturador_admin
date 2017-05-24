import { fromJS } from 'immutable';
import { FETCHED_DETALLE } from '../actions/invoice';

export default (state=fromJS([]), action)=>{
	switch(action.type){
		case FETCHED_DETALLE:
			return fromJS(action.payload);
		default:
			return state;
	}
}