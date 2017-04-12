import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPagos } from '../actions/pagos';
import    Pagos2  from '../components/pagos';


const selector = state => ({
	pagos: state.get('pagos'),
	ent:"",
})
class Filter extends Component {
	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchPagos());
	}
constructor(props){
		super(props);
			this.handleChangeCategory=this.handleChange.bind(this,'ent');
	}
	handleChange(pagos,event){
		const { props: { pagos } } = this;
		const NPagos =event.target.value;
		this.setState({ NPagos});
	}
	render(){
		const { props: { pagos } } = this;
		return (
			<Pagos1 pagos={ pagos }/>
			<Pagos2 pagos={ pagos }/>
		);
	}
}
export default connect(selector)(Pagos);