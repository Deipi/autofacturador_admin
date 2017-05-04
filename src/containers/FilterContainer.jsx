import React, { Component, PropTypes } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';

import FilterClave from '../components/FilterClave';
import FilterPagos from '../components/FilterPagos';
import FilterFecha from '../components/FilterFecha';

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
        	searchByText: null,
        	searchByState: null,
        	searchByPagoStart: null,
			searchByPagoEnd: null,
			searchByTimbradoStart: null,
			searchByTimbradoEnd: null,
        }
    }

    updateTextFilter(input) {
    	this.setState({ searchByText: input.target.value })
    }

    updateSearchState(input) {
		this.setState({ searchByState: input.target.value })
    }

    updateSearchPagoStart(start) {
    	this.setState({ searchByPagoStart: start })
    }

    updateSearchPagoEnd(end) {
    	this.setState({ searchByPagoEnd: end })
    }

    updateSearchTimbradoStart(start) {
    	this.setState({ searchByTimbradoStart: start })
    }

    updateSearchTimbradoEnd(end) {
    	this.setState({ searchByTimbradoEnd: end })
    }

    retrieveFilteredReceipts(){
    	console.log(this.state)
    }

    render() {
        return (
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
            				start={ this.state.searchByPagoStart }
            				end={ this.state.searchByPagoEnd }
            			/>
					</Col>
					<Col sm='6'>
            			<FilterFecha
            				prefix="Fecha de Timbrado"
            				updateSearchPagoStart={ this.updateSearchTimbradoStart }
            				updateSearchPagoEnd={ this.updateSearchTimbradoEnd }
            				start={ this.state.searchByTimbradoStart }
            				end={ this.state.searchByTimbradoEnd }
            			/>
					</Col>
        		</Row>
        		<Row>
        			<Col sm={{ size: 2, offset: 10 }}>
						<Button color="info" onClick={ this.retrieveFilteredReceipts } >Filtrar</Button>
        			</Col>
        		</Row>
            </Container>
        );
    }
}

export default FilterContainer;
