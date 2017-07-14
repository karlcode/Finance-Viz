import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart'
import Vis from './Vis'
import Sample from './Sample'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<BarChart data={[5,10,2,3,3,3,5,5,3]} size={[500,500]} />*/} 
        <Sample/>
      </div>
    );
  }
}

export default App;
