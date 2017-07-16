import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart'
import Vis from './Vis'
import Sample from './Sample'
import TheOtherSample from './TheOtherSample'
import News from './News'
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<BarChart data={[5,10,2,3,3,3,5,5,3]} size={[500,500]} />*/} 

          <TheOtherSample/>
        <News/>
      </div>
    );
  }
}

export default App;
