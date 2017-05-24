import { connect } from 'react-redux';

import CustomTableContainer from './table-container';
import CustomTable from './table';
import CustomRow from './custom-row';

import { rowSelector } from './selectors';
import { TOGGLE_ROW } from './actions';

export const plugin = {
	components: {
		TableContainer: CustomTableContainer,
		Table: CustomTable,
		Row: connect(rowSelector)(CustomRow),
	},
	reducer: {
		[TOGGLE_ROW](state, action) {
			  const { payload: { griddleKey, isOpen } } = action;
			  return state.update('data', data =>
				data.merge([ data.find(r => r.get('griddleKey') === griddleKey).update(
					map => map.merge({ isOpen })
			  ) ]));
		},
	},
};
