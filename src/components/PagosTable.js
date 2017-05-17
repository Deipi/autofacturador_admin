import React, { Component } from 'react';

import Griddle, { ColumnDefinition,RowDefinition,plugins} from 'griddle-react';
import { Badge,Button,Col} from 'reactstrap';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

const rowDataSelector = (state, { griddleKey }) => {
	return state
		.get('data')
		.find(rowMap => rowMap.get('griddleKey') === griddleKey)
		.toJSON();
};

const enhancedWithRowData = connect((state, props) => {
	return {
		rowData: rowDataSelector(state, props)
	};
});

const NewLayout = ({ Table,Pagination}) => (
  <div>
	<Table />
	<Pagination />
  </div>
);

const stateMap = {
	"U": ["Pago", "default"],
	"I": ["Facturado", "success"],
	"E": ["Cancelada", "danger"]
}

const CustomColumn1 = ({value}) => <Badge color={stateMap[value][1]}>{ stateMap[value][0] }</Badge>;

const OptionsComponent = ({ value, griddleKey, rowData }) => {
	if(rowData.state === "U"){
		return(
			<Link className="pull-right" to="/AutoFacturador"><Button type="button"><i className="fa fa-list" /> Facturar</Button></Link>
		);
	} else if(rowData.state === "I"){
		return(
			<Link className="pull-right" to={`/receipts/${rowData.code}`}><button type="button"><i className="fa fa-list" /><i className="fa fa-info-circle" /></button></Link>
		);
	} else {
		return(
			<button className="pull-right"><i className="fa fa-reply-all" aria-hidden="true"></i> Refacturar</button>
		);
	}
}

export class PagosTable extends Component {
	render() {
		const { props: { pagos } } = this;

		return (
			<Col className="col-md-12" >
				<Griddle data={ pagos.toJS()}
					plugins={[plugins.LocalPlugin]}
					styleConfig={{classNames:
					 { Table: 'table table-striped',} }}
					 components={{
						Layout: NewLayout }}>
					<RowDefinition>
						<ColumnDefinition id="code" title="Codigo" visible />
						<ColumnDefinition id="state" title="Estado" visible customComponent={CustomColumn1}/>
						<ColumnDefinition id="payment_date" title="Fecha de Pago"visible/>
						<ColumnDefinition id="sub_total" title="Sub Total"visible/>
						<ColumnDefinition id="transferred_taxes" title="Impuestos Transferidos"visible/>
						<ColumnDefinition id="retained_taxes" title="Impuestos retenidos"visible/>
						<ColumnDefinition id="total"title="Total" visible/>
						<ColumnDefinition id="option"  title="Opciones"visible customComponent={ enhancedWithRowData(OptionsComponent) } />
					</RowDefinition>
				</Griddle>
			</Col>
		);
	}
}

export default PagosTable;
