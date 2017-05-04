import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import fetchPagosFilter from '../actions/filters';
import fetchPagos from '../actions/receipt';
import FilterPagos from '../components/FilterPagos'
import FilterFecha from '../components/FilterFecha'
import FilterClave from '../components/FilterClave'
import PagosTable  from '../components/PagosTable';

import FilterContainer from './FilterContainer';



const selector = state => ({
	pagos: state.get('pagos'),
})
class PagosContainer extends Component {
	constructor(props) {
		super(props);
		this.onClickFilter=this.onClickFilter.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
		  filter: {}
		}
	}
	onChange(event) {
		const { state: { filter} } = this;
		const { target: { value, name, } } = event;
		filter[name] = value
		this.setState({filter});
	 }
	componentWillMount() {
		const { props: { dispatch } } = this;
		dispatch(fetchPagos());
	}
	onClickFilter(){
		const { props: { dispatch }, state: { filter } } = this;
			dispatch(fetchPagosFilter(filter));
	}
	handleChange = ({ startDate, endDate }) => {
		startDate = startDate || this.state.startDate
		endDate = endDate || this.state.endDate

		if (startDate.isAfter(endDate)) {
		  var temp = startDate
		  startDate = endDate
		  endDate = temp
		}

	   this.setState({ startDate, endDate })
	}

	handleChangeStart = (startDate) => this.handleChange({ startDate })

	handleChangeEnd = (endDate) => this.handleChange({ endDate })

	handleChangeRaw(value) {
		if(value === "tomorrow") {
			const tomorrow = moment().add(1, "day")
			this.handleChange(tomorrow)
		}
	}

	render(){
		const { props: { pagos } } = this;
		return (
			<div>
				<FilterContainer />
				<PagosTable pagos={ pagos }/>
			</div>
		);
	}
}

export default connect(selector)(PagosContainer);
