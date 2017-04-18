import React, { Component } from 'react';
import Griddle, { ColumnDefinition,RowDefinition,plugins} from 'griddle-react';
import { Badge } from 'reactstrap';

const NewLayout = ({ Table,Filter,Pagination }) => (
  <div>
  	<Filter />
    <Table />
    <Pagination />
  </div>
);

export class Filter extends Component {
	constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.setFilter(e.target.value);
  }
  render() {
   return (
      <select onChange={this.onChange}>
        <option value="">--Todos--</option>
        <option value="U">Pago</option>
        <option value="I">Facturadas</option>
        <option value="E">Canceladas</option>
      </select>
    );
  }
}


const stateMap = {
	"U": ["Pago", "default"],
	"I": ["Facturado", "success"],
	"E": ["Cancelada", "danger"]
}

const CustomColumn = ({value}) => <i className="fa fa-list"/>;
const CustomColumn1 = ({value}) => <Badge color={stateMap[value][1]}>{ stateMap[value][0] }</Badge>;

export class Pagos extends Component {


	render() {
		const { props: { pagos } } = this;
		return (
			<Griddle data={ pagos.toJS()}
				plugins={[plugins.LocalPlugin]}
				styleConfig={{classNames:
				 { Table: 'table table-striped',} }}
				 components={{
				 	Filter: Filter,
				 	Layout: NewLayout }}>
				<RowDefinition>
		   	  		<ColumnDefinition id="code" title="Codigo"visible />
			      	<ColumnDefinition id="state" title="Estado" visible customComponent={CustomColumn1}/>
		      		<ColumnDefinition id="payment_date" title="Fecha de Pago"visible/>
		      		<ColumnDefinition id="sub_total" title="Sub Total"visible/>
		      		<ColumnDefinition id="transferred_taxes" title="Impuestos Transferidos"visible/>
		      		<ColumnDefinition id="retained_taxes" title="Impuestos retenidos"visible/>
		      		<ColumnDefinition id="total"title="Total" visible/>
		      		<ColumnDefinition id="options"  title="Opciones"visible  customComponent={CustomColumn}/>
		 		</RowDefinition>
			</Griddle>
		);

	}

}

export default Pagos
