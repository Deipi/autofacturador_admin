import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPagos } from '../actions/pagos';
import Pagos1  from '../components/pagos';

const selector = state => ({
	pagos: state.get('pagos'),
})
class Pagos extends Component {
	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchPagos());
	}
	render(){
		const { props: { pagos } } = this;
		return (
			<Pagos1 pagos={ pagos }/>
		);
	}
}
export default connect(selector)(Pagos);