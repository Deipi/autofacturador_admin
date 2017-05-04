import React, { Component } from 'react';
import { connect } from 'react-redux';


export class FilterPagos extends Component {
   render() {
		const { onChangee }=this.props;
	   return (
			<div>
				<select name='state' onChange={ onChangee } >
					<option value="">--Todos--</option>
					<option value="U">Pago</option>
					<option value="I">Facturadas</option>
					<option value="E">Canceladas</option>
				</select>

			</div>
		);
	 }
}

export default FilterPagos;
