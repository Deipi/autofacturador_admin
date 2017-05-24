import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';

import {
	classNamesForComponentSelector,
	stylesForComponentSelector,
	visibleRowCountSelector,
	visibleRowIdsSelector,
} from 'griddle-react/dist/module/selectors/dataSelectors';

export default OriginalComponent => compose(
	getContext({
		components: React.PropTypes.object,
	}),
	mapProps(props => ({
		TableHeading: props.components.TableHeading,
		TableBody: props.components.TableBody,
		NoResults: props.components.NoResults,
		Row: props.components.Row,
	})),
	connect(
		state => ({
			visibleRows: visibleRowCountSelector(state),
			visibleRowIds: visibleRowIdsSelector(state),
			className: classNamesForComponentSelector(state, 'Table'),
			style: stylesForComponentSelector(state, 'Table'),
		}),
	),
)(props => <OriginalComponent { ...props } />);
