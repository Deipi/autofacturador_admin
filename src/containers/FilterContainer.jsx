import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col, Button,Breadcrumb, BreadcrumbItem } from 'reactstrap';

import FilterClave from '../components/FilterClave';
import FilterPagos from '../components/FilterPagos';
import FilterFecha from '../components/FilterFecha';
import fetchPagosFilter	from '../actions/filters';

class FilterContainer extends Component {

	constructor(props) {
		super(props);
		this.updateTextFilter = this.updateTextFilter.bind(this);
		this.retrieveFilteredReceipts = this.retrieveFilteredReceipts.bind(this);
		this.updateSearchState = this.updateSearchState.bind(this);
		this.updateSearchPagoStart = this.updateSearchPagoStart.bind(this);
		this.updateSearchPagoEnd = this.updateSearchPagoEnd.bind(this);
		this.updateSearchTimbradoStart = this.updateSearchTimbradoStart.bind(this);
		this.updateSearchTimbradoEnd = this.updateSearchTimbradoEnd.bind(this);

		this.state = {
			search: null,
			state: null,
			start_pdate: null,
			end_pdate: null,
			start_sdate: null,
			end_sdate: null,
		}
	}

	updateTextFilter(input) {
		this.setState({ search: input.target.value })
	}

	updateSearchState(input) {
		this.setState({ state: input.target.value })
	}

	updateSearchPagoStart(start) {
		this.setState({ start_pdate: start })
	}

	updateSearchPagoEnd(end) {
		this.setState({ end_pdate: end })
	}

	updateSearchTimbradoStart(start) {
		this.setState({ start_sdate: start })
	}

	updateSearchTimbradoEnd(end) {
		this.setState({ end_sdate: end })
	}

	retrieveFilteredReceipts() {
		const { dispatch } = this.props;

		let queyObj = this.state;
		const queryArray = []
		for (var key in queyObj) {
			if (queyObj.hasOwnProperty(key)) {
				if (queyObj[key]) {
					queryArray.push(`${ key }=${queyObj[key]}`);
				}
			}
		}
		dispatch(fetchPagosFilter(queryArray.join('&')))
	}

	render() {
		return (
			<Col className="col-md-12 offset-1" >
			<div>
					<Breadcrumb tag="nav">
						<BreadcrumbItem active tag="span">receipts</BreadcrumbItem>
					</Breadcrumb>
				</div>
			<Container className="mt-5">
				<Row>
					<Col sm='6'>
						<FilterClave onTextUpdate={ this.updateTextFilter } />
					</Col>
					<Col sm='6'>
						<FilterPagos updateSearchState={ this.updateSearchState } />
					</Col>
					<Col sm='6'>
						<FilterFecha
							prefix="Fecha de Pago"
							updateSearchPagoStart={ this.updateSearchPagoStart }
							updateSearchPagoEnd={ this.updateSearchPagoEnd }
							start={ this.state.start_pdate }
							end={ this.state.end_pdate }
						/>
					</Col>
					<Col sm='6'>
						<FilterFecha
							prefix="Fecha de Timbrado"
							updateSearchPagoStart={ this.updateSearchTimbradoStart }
							updateSearchPagoEnd={ this.updateSearchTimbradoEnd }
							start={ this.state.start_sdate }
							end={ this.state.end_sdate }
						/>
					</Col>
				</Row>
				<Row>
					<Col sm={{ size: 2, offset: 10 }}>
						<Button color="info" onClick={ this.retrieveFilteredReceipts } >Filtrar</Button>
					</Col>
				</Row>
			</Container>
			</Col>
		);
	}
}

export default connect()(FilterContainer);
