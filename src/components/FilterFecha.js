import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export class FilterFecha extends Component {
	render() {
		const { start,end,onChangef ,change1 ,change  }=this.props;

	return (
		<div>
			<button>Fecha de Pago</button><button><i className="fa fa-calendar" /></button>
			<DatePicker
				name='data1'
				selected={start}
				selectsStart
				startDate={start}
				endDate={end}
				onChange={ change }
				placeholderText="Fecha Inicio"
				onChangeRaw={(event) =>
				  this.props.handleRow(event.target.value)}
			/>
			<DatePicker
				name='data2'
				selected={end}
				selectsEnd
				startDate={start}
				endDate={end}
				onChange={ change1 }
				placeholderText="Fecha Final "
				onChangeRaw={(event) =>
					this.props.handleRow(event.target.value)}
			/>
		</div>
		);
	  }
	}

export default FilterFecha;
