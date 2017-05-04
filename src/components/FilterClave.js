import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export class FilterClave extends Component {
	render() {
		return (
			<FormGroup>
				<Input type="text" name="code"  placeholder="Buscar..." onChange={ this.props.onTextUpdate } />
			</FormGroup>
		);
	 }
}

export default FilterClave;
