import React, { Component } from 'react';
import classNames from 'classnames';

import {
	Collapse,
	Row,
	Col
} from 'reactstrap';

import toggleRow from './actions';



const Detail = ({ receptor, conceptos, created_at, total, uuid, recipient_code, state }) => {
	if(	state==='I'){
		return(
			<div>
				<hr/>
				<h4>Resumen: </h4>
				<strong className="span2 offset4">Clave: </strong> { recipient_code }
				<br/>
				<strong>Fecha de pago: </strong> { created_at }
				<br/>
				<strong>RFC: </strong> { receptor.get('rfc') }
				<br/>
				<strong>Total: </strong> { total }
				<br/>
				<strong>Folio fiscal: </strong> { uuid }
				<br/>
				<strong>Conceptos facturados: </strong> { conceptos.toJS().map(c => c['descripcion']).join(', ') }
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
										<span className="input-group-addon"><i className="fa fa-envelope fa-2x"/></span>
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
			</div>

			);
	}
	return(
		<h1>cancelada</h1>
	);
}


export default class CustomRow extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};


	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { props: { dispatch, griddleKey, rowData } } = this;
		dispatch(toggleRow({ isOpen: !rowData.get('isOpen'), griddleKey }));
	}
	render() {
		const {
			props: {
				Cell,
				griddleKey,
				columnIds,
				style,
				className,
				rowData,
			},
		} = this;

		const isOpen =rowData.get('isOpen'),
			recipient_code =rowData.get('recipient_code'),
			created_at =rowData.get('created_at'),
			receptor =rowData.get('receptor'),
			total =rowData.get('total'),
			uuid =rowData.get('uuid'),
			conceptos =rowData.get('conceptos'),
			state =rowData.get('state');
 		return (
			<tbody>
				<tr
					key={ griddleKey }
					style={ style }
					className={ className }
					onClick={ this.handleClick }
				>

					{ columnIds && columnIds.map(columnId => (
						<Cell
							key={ `${ columnId }-${ griddleKey }` }
							griddleKey={ griddleKey }
							columnId={ columnId }
							style={ style }
							className={ classNames(className, 'invoice-table') }
						/>
					))}
				</tr>
				<Collapse tag="tr" isOpen={ isOpen } className="data-detail">
					<td colSpan="5" className="admin-table-edit">
						<div>
							<Detail
								receptor = { receptor }
								conceptos = { conceptos }
								created_at = { created_at }
								total = { total }
								uuid = {uuid}
								recipient_code = { recipient_code }
								state={ state }
							/>
						</div>
					</td>
				</Collapse>
			</tbody>
		);
	}
}
