import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPagos } from '../actions/receipt';
import  DetalleFactura from '../components/DetalleFactura'


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

	render(){
		const { props: { pagos } } = this;
		return (
			<div>
				null;
			</div>
		);
	}
}

export default connect(selector)(DetalleFactura);
