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
  render() {
   return (
      <select id="category"onChange={this.handleChange}>
        <option value="default">--Todos--</option>
        <option value="Pago">Pago</option>
        <option value="Facturado">Facturadas</option>
        <option value="Cancelada">Canceladas</option>
      </select>
    );
  }
}


const stateMap = {
	"U": ["Pago", "default"],
	"I": ["Facturado", "success"]
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
				 components={{ Layout: NewLayout, Filter }}>
				<RowDefinition>
		   	  		<ColumnDefinition id="code" visible />
			      	<ColumnDefinition id="state" visible customComponent={CustomColumn1}/>
		      		<ColumnDefinition id="payment_date" visible/>
		      		<ColumnDefinition id="sub_total" visible/>
		      		<ColumnDefinition id="transferred_taxes" visible/>
		      		<ColumnDefinition id="retained_taxes" visible/>
		      		<ColumnDefinition id="total" visible/>
		      		<ColumnDefinition id="options"  visible  customComponent={CustomColumn}/>
		 		</RowDefinition>
			</Griddle>
		);

	}

}

export default Pagos
