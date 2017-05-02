import React, { Component } from 'react';
import { connect } from 'react-redux';


export class Filterclave extends Component {
   	render() {
   		const { onClick,onChange }=this.props;

		return (
	   		<div>
	   			<input type="text" placeholder="Filtra Clave" name='code' onChange={ onChange } />
	   			<button onClick={ onClick }>Filter</button>
		  	</div>
	    );
	 }
}

export default connect()(Filterclave);
