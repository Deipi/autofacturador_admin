import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {Button,Col,  Badge , Table , InputGroupAddon,Breadcrumb, BreadcrumbItem   } from 'reactstrap';
import Griddle, { ColumnDefinition,RowDefinition,plugins} from 'griddle-react';


import { fetchPagos } from '../actions/receipt';
import { fetchDetalle } from '../actions/invoice';
import { plugin } from '../plugin';

const selector = state => ({
	pagos: state.get('pagos'),
	invoice: state.get('invoice')
})

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

const stateMap = {
	"U": ["Pago", "default"],
	"I": ["Facturado", "success"],
	"E": ["Cancelada", "danger"]
}
const stateMapd = {
	"U": ["Pago", "default"],
	"I": ["Timbrado", "success"],
	"E": ["Cancelada", "danger"]
}
const NewLayout = ({ Table,Pagination}) => (
  <div>
	<Table />
	<Pagination />
  </div>
);
const OptionsComponent = ({ value, griddleKey, rowData }) => {
	if(rowData.state === "I"){
		return(
			<Button  className="pull-right" type="button"><i className="fa fa-ban fa-fw" /> Cancelar</Button>
		);
	} else if(rowData.state === "E"){
		return(
			<button className="pull-right"><i className="fa fa-reply-all" aria-hidden="true"></i> Refacturar</button>
		);
	}
}
const OptionsComponent1 = ({ value, griddleKey, rowData }) => {
	if(rowData.state === "I"){
		return(
		<h5>Facturado</h5>
		);
	} else if(rowData.state === "E"){
		return(
			<h5>Cancelado</h5>
		);
	}
}

const CustomColumn1 = ({value}) => <Badge color={stateMapd[value][1]}>{ stateMapd[value][0] }</Badge>;

class DetalleFactura extends Component {
	constructor(props) {
		super(props);
		const { pagos,invoice, match: { params: { code } } } =props;
		this.state = {
			pago: pagos.find((h)=> h.getIn(['code'])===code),
			invoices: invoice.find((i)=> i.getIn(['recipient_code'])===code)
		};
	}

	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchPagos());
		dispatch(fetchDetalle());
	}

	componentWillReceiveProps(nextProps) {
		const { pagos,invoice, match: { params: { code } } } = nextProps;
		this.setState({
			pago: pagos.find((h)=> h.getIn(['code'])===code),
			invoices: invoice.find((i)=> i.getIn(['recipient_code'])===code)
		});
	}
	render() {
		const { state: { pago }  } = this;
		const { invoice, match: { params: { code } } } =this.props;
		const detalle=invoice.filter((i)=> i.get('recipient_code')===code)

		if(pago) {
			return (
				<div>
					<div>
						<Breadcrumb tag="nav">
							<Link  to="/"><BreadcrumbItem>receipts</BreadcrumbItem></Link>
							<BreadcrumbItem active tag="span"> / Detalle</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div className="col-sm-6 col-sm-offset-3">
						<h3>Detalle de Pago</h3>
						<br/>
						<Col sm={{size:12,push:3, pull:3,offset:3}}>
							<InputGroupAddon className="text-left">Resumen:</InputGroupAddon>
							<Table>
								<thead>
									<tr>
										<td className="col-sm-9"></td>
										<td className="col-sm-9"></td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">Clave: </th>
										<td>{ pago.get('code') }</td>
									</tr>
									<tr>
										<th scope="row">Estado:</th>
										<td><Badge color={stateMap[pago.get('state')][1]}>{ stateMap[pago.get('state')][0] }</Badge></td>
										<td></td>
									</tr>
									<tr>
										<th scope="row">Fecha de pago:</th>
										<td>{ pago.get('payment_date') }</td>
									</tr>
									<tr>
										<th scope="row">Total:</th>
										<td>{"$"} { pago.get('total') }</td>
									</tr>
									<tr>
										<th scope="row">Concepto del pago:</th>
										<td>
											<ul>
												{ pago.get('concepto') ? pago.get('concepto').map(concept=>(
													<div key={ concept }>
														<li>{ concept.toJS().descripcion }</li>
													</div>
													)):null
												}
											</ul>
										</td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</div>
					<hr/>
					<h2 className="text-center">Comprobantes</h2>
					<Col className="col-md-12" >
						<Griddle data={detalle.toJS()}
							plugins={[plugins.LocalPlugin,plugin]}
							pago={this.props.pago}
							styleConfig={{classNames:
							 { Table: 'table table-striped',} }}
							  components={{
							Layout: NewLayout
							}}>
							<RowDefinition>
								<ColumnDefinition id="type" title="Tipo" visible  customComponent={enhancedWithRowData(OptionsComponent1)} />
								<ColumnDefinition id="state" title="Estado" visible customComponent={CustomColumn1}/>
								<ColumnDefinition id="name" title="Receptor" visible />
								<ColumnDefinition id="uuid" title="uuid"  visible />
								<ColumnDefinition id="option" title="opciones"  visible customComponent={ enhancedWithRowData(OptionsComponent) } />
							</RowDefinition>
						</Griddle>
					</Col>
				</div>
			);
		}
		return null;
	};
}

export default connect(selector)(DetalleFactura);
