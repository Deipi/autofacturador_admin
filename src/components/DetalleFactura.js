import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {Col, Row, Badge , Table , InputGroup , InputGroupAddon, Input,Breadcrumb, BreadcrumbItem   } from 'reactstrap';
import { CardStack, Card } from 'react-cardstack';


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
						<Link  to="/"><BreadcrumbItem tag="a" href="">receipts</BreadcrumbItem></Link>
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
					</Col>
				</div>
				<hr/>
				<h2 className="text-center">Comprobantes</h2>
				<CardStack
						height={850}
						width={1120}
						background='#f8f8f8'
						hover={25}>
					<Card background='#D0DCD0'  >
						<Table>
							<thead>
								<tr>
									<th>Tipo</th>
									<th>Estado</th>
									<th>Info</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Factura</td>
									<td><Badge color={stateMap[pago.get('state')][1]}>{ stateMap[pago.get('state')][0] }</Badge></td>
									<td>
								<ul>
									<li>{ pago.get('invoice_data') ? pago.get('invoice_data').map(invoice_data=>(
										<div key = { invoice_data }>
											<li>{ invoice_data }</li>
										</div>
										)):null }
									</li>
								 </ul>
								 </td>
								</tr>
							</tbody>
						</Table>
						<h3 className="offset-4 ">Descargue su factura</h3>
						<Row>
							<Col>
								<h4>Resumen: </h4>
								<strong className="span2 offset4">Clave: </strong>
								{ pago.get('code') }
								<br/>
								<strong>Fecha de pago: </strong>
								{ pago.get('payment_date') }
								<br/>
								<strong>RFC: </strong>
								{ pago.get('rfc') }
								<br/>
								<strong>Total: </strong>
								{ pago.get('total') }
								<br/>
								<strong>Folio fiscal: </strong>
								{ pago.get('invoice_data').toJS().uuid }
								<br/>
								<strong>Conceptos facturados: </strong>
								<br/>
								<ul>
									<li>{ pago.get('concepto') ? pago.get('concepto').map(concept=>(
										<div key = { concept }>
											<li>{ concept }</li>
										</div>
										)):null }
									</li>
								</ul>
								<hr/>
								<h2 className="text-center">Descargar</h2>
								<div className="text-center">
									<div className="text-center ">
										<a className=" btn btn-primary btn-lg ladda-button" download data-style="zoom-in" data-resource="/selfinvoice/request/5cb06e88-cfa6-44e2-b1b9-6c51c954b830.pdf" role="button"><i className="fa fa-file-pdf-o fa-3x" /><br/>Archivo PDF</a>
										<a className=" btn btn-primary btn-lg ladda-button" download data-style="zoom-in" data-resource="/selfinvoice/request/5cb06e88-cfa6-44e2-b1b9-6c51c954b830.zip" role="button"><i className="fa fa-file-zip-o fa-3x" /><br/>Archivo ZIP</a>
										<a className=" btn btn-primary btn-lg ladda-button" download data-style="zoom-in" data-resource="/selfinvoice/request/5cb06e88-cfa6-44e2-b1b9-6c51c954b830.xml" role="button"><i className="fa fa-file-pdf-o fa-3x" /><br/>Archivo XML</a>
									</div>
									<hr/>
									<div className="text-center">
										<h2 className="text-center">Enviar por correo electronico</h2>
										<Row className="col-sm-4">
											<Col className="text-center">
												<div className="form-group">
													<div className="input-group push-8 offset-8" >
															<span clasName="input-group-addon"><i className="fa fa-envelope fa-2x"/></span>
															<input className="input-lg emailinput form-control required" id="email" name="email" placeholder="Proporcione su correo electronico" type="email" />
													</div>
												</div>
											</Col>
										</Row>
									</div>
								</div>
								<Row className="offset-5">
									<button className="btn btn-primary btn-lg ladda-button" data-invoice="/selfinvoice/invoice/email/5cb06e88-cfa6-44e2-b1b9-6c51c954b830/"
									data-style="expand-left" type="submit" >Enviar correo</button>
								</Row>
							</Col>
						</Row>
					</Card>
					<Card background='#D0DCD0' >
					</Card>
				</CardStack>
			</div>
		);
		}
		return null;
	};
}

export default connect(selector)(DetalleFactura);
