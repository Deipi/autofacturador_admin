import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import { InputGroup, InputGroupAddon, Input, Row, Col} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';


export class FilterFecha extends Component {
	render() {
		return (
			<InputGroup>
				<InputGroupAddon>{ this.props.prefix }</InputGroupAddon>
				<InputGroupAddon><i className="fa fa-calendar" /></InputGroupAddon>
				<DatePicker
					selected={ this.props.start }
					startDate = { this.props.start }
					endDate = { this.props.end }
				    selectsStart
				    onChange={ this.props.updateSearchPagoStart }
				/>
				<DatePicker
					selected = { this.props.end }
					startDate = { this.props.start }
					endDate = { this.props.end }
				    selectsEnd
				    onChange={ this.props.updateSearchPagoEnd }
				/>
			</InputGroup>
		);
	}
}

export default FilterFecha;
