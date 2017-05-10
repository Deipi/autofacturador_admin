import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Badge,Table,InputGroup, InputGroupAddon, Input,Breadcrumb, BreadcrumbItem   } from 'reactstrap';

import { fetchPagos } from '../actions/receipt';

const selector = state => ({
	pagos: state.get('pagos'),
})

const stateMap = {
	"U": ["Pago", "default"],
	"I": ["Facturado", "success"],
	"E": ["Cancelada", "danger"]
}


class DetalleFactura extends Component {
	constructor(props) {
		super(props);
		const { pagos, match: { params: { code } } } =props;
		this.state = {
			pago: pagos.find((h)=> h.getIn(['code'])===code)
		};
	}

	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchPagos());
	}

	componentWillReceiveProps(nextProps) {
		const { pagos, match: { params: { code } } } = nextProps;

		this.setState({
			pago: pagos.find((h)=> h.getIn(['code'])===code)
		});
	}

	render() {
		const { state: { pago } } = this;


		if(pago) {
					return (
			<div>
				<div>
				 <Breadcrumb tag="nav">
					 <BreadcrumbItem tag="a" href="/">receipts</BreadcrumbItem>
					 <BreadcrumbItem active tag="span">Detalle</BreadcrumbItem>
				 </Breadcrumb>
			</div>
				<div className="col-sm-6 col-sm-offset-3">
					<h2>Detalle de Pago</h2>
					<br/>
					<InputGroupAddon className="text-left">Resumen:</InputGroupAddon>
					<div>
						<Table>
							<thead>
								<tr>
									<td className="col-sm-3"></td>
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
									<td>{ pago.get('total') }</td>
								</tr>
								<th scope="row">
									Concepto del pago:
								</th>
								<td>
									<ul>
										<li>{ pago.get('concepto') ? pago.get('concepto').map(concept=>(
											<div key = { concept }>
												<li>{ concept }</li>
											</div>
											)):null }
										</li>
									 </ul>
								</td>
							</tbody>
						</Table>
					</div>
				</div>
				<hr/>
				<h2 className="text-center">Comprobantes</h2>
			</div>
		);
		}
		return null;
	};
}

export default connect(selector)(DetalleFactura);
