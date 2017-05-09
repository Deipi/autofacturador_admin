import React, { Component } from 'react';

export class DetalleFactura extends Component {
	render() {
		return (
			<div>
				<div class="col-sm-6 col-sm-offset-3">
					<h2>Detalle de Pago</h2>
					<br/>
					<div className="panel panel-default">
						<div className="panel-bodys">
							Resumen:
						</div>
					</div>
					<table className="table">
						<thead>
							<tr>
								<td class="col-sm-3"></td>
								<td class="col-sm-9"></td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td scope="row">Clave: </td>
								<td>...</td>
							</tr>
							<tr>
								<td scope="row">Estado:</td>
								<td>...</td>
							</tr>
							<tr>
								<td scope="row">Fecha de pago:</td>
								<td>...</td>
							</tr>
							<tr>
								<td scope="row">Total:</td>
								<td>...</td>
							</tr>
							<th scope="row">
								Concepto del pago:
							</th>
							<td>
								<ul>
									<li> A Taco de filete</li>
									<li> Agua</li>
									<li> Diabla</li>
									<li> Quesadilla</li>
								 </ul>
							</td>
						</tbody>
					</table>
				</div>
				<hr/>
				<h2 className="text-center">Comprobantes</h2>
			</div>
		);
	}
}

export default DetalleFactura;
