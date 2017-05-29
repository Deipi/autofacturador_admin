import React, { Component } from 'react';

import { FormGroup,Input } from 'reactstrap';

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
