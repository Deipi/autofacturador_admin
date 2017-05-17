import React from 'react';
import {Field, reduxForm,FieldArray} from 'redux-form/immutable'
import { Breadcrumb, BreadcrumbItem,Col, Row ,CardText,CardTitle,Card } from 'reactstrap';
import { Link } from 'react-router-dom';

const renderField = ({input, type, meta: {touched, error}}) => (
  <div>
	<div>
	  <input {...input} type={type} />
	  {touched && error && <span>{error}</span>}
	</div>
  </div>
)

const renderMembers = ({fields, meta: {error, submitFailed}}) => (
		  <ul>
			<li>
			  <button type="button" onClick={() => fields.push({})}><i className="fa fa-plus-circle icon-green ro" /></button>
			  {submitFailed && error && <span>{error}</span>}
			</li>
			{fields.map((member, index) => (
			  <li key={index}>
				<Row>
					<Col className="col-md-3">
						<Field
						  name={`${member}.firstName`}
						  type="text"
						  component={renderField}
						  label="First Name"
						  placeholder="Llave de Pago"
						/>
						<Field
						  name={`${member}.lastName`}
						  type="text"
						  component={renderField}
						  label="Last Name"
						/>

					</Col>
				</Row>
				<button
					type="button"
					title="Remove Member"
					placeholder="Número de Operacion"
					onClick={() => fields.remove(index)}>
				  <i className="fa fa-trash-o" aria-hidden="true"></i>
				</button>
			  </li>
			))}
		  </ul>
)

const AutoFacturador = props => {
	return (
		<div>
		<div>
			<Breadcrumb tag="nav">
				<Link  to="/"><BreadcrumbItem tag="a" >receipts</BreadcrumbItem></Link>
				<BreadcrumbItem active tag="span">/ Generar Factura</BreadcrumbItem>
			</Breadcrumb>
		</div>
			<div>
				<h3>Generar su propia factura</h3>
			</div>
			<form id="autoinvoice">
				<fieldset>
					<legend>Información del pago</legend>
				</fieldset>
				<Row>
					<Col className="col-md-6">
						<Row>
							<Col className="col-md-3">
								<Field
									name="clubName"
									type="text"
									placeholder="Número de Operacion"
									component={renderField}
								/>
							</Col>
							<Col className="col-md-3">
								<Field
									name="clubName1"
									type="text"
									placeholder="Llave de Pago"
									component={renderField}
								/>
							</Col>
						</Row>
						<FieldArray name="members" component={renderMembers} />
						<br/>
						<button data-style="zoom-in" type="button" className="btn btn-primary"><i title="Buscar" className="fa fa-search fa-2x"/></button>
					</Col>
					<Col className="col-md-6">
						<Card block>
							<CardTitle>Special Title Treatment</CardTitle>
							<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
						</Card>
					</Col>
				</Row>
			</form>
		</div>
	);
}

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
})(AutoFacturador)