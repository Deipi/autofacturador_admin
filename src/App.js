import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
  	    const { props: { children } } = this;
    return (
    	<div>
    { children }
    </div>
    );
  }
}
export default App;
