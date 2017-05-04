import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormGroup, Input } from 'reactstrap';

export class FilterPagos extends Component {
   render() {
		const { onChangee }=this.props;
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
