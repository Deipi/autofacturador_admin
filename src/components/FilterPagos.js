import React, { Component } from 'react';

import { FormGroup, Input } from 'reactstrap';

export class FilterPagos extends Component {
   render() {
	   return (

			<FormGroup>
				<Input type="select" name="select" onChange={ this.props.updateSearchState } >
					<option value="">--Todos--</option>
					<option value="U">Pago</option>
					<option value="I">Facturadas</option>
					<option value="E">Canceladas</option>
				</Input>
			</FormGroup>
		);
	 }
}

export default FilterPagos;
