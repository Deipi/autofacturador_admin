import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPagos,fetchPagosFilterc} from '../actions/pagos';
import FilterPagos from '../components/FilterPagos'
import Filterfecha from '../components/Filterfecha'
import Filterclave from '../components/Filterclave'
import Pagos1  from '../components/pagos';
import moment from 'moment';


const selector = state => ({
	pagos: state.get('pagos'),
})
class Pagos extends Component {
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
			dispatch(fetchPagosFilterc(filter));
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
				<Filterclave onChange={this.onChange} onClick={this.onClickFilter} />
				<FilterPagos onChangee={this.onChange} />
				<Filterfecha onChangef={this.onChange} handleRow={this.handleChangeRaw} start={this.state.startDate}  change={this.handleChangeStart} end={this.state.endDate} change1={this.handleChangeEnd} />
				<Pagos1 pagos={ pagos }/>
			</div>
		);
	}
}

export default connect(selector)(Pagos);
