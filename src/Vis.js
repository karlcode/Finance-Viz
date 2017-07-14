import React, { Component } from 'react'
import './App.css'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';

var myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*, *",
});
const DATA = [
  [
    {x: 1, y: 10},
    {x: 2, y: 7},
    {x: 3, y: 15}
  ],
  [
    {x: 1, y: 20},
    {x: 2, y: 5},
    {x: 3, y: 15}
  ]
];

export default class Vis extends Component {
  state = {
    crosshairValues: [],
    heldValue: false
  }
componentDidMount(){
    var data = []
    var myInit = {method: 'GET',
                  headers: myHeaders,
                  mode: 'cors',
                  cache: 'force-cache' };
  fetch('https://www.quandl.com/api/v3/datasets/WIKI/AAPL/data.json?api_key=UXBsxuWqVeC2jAzbA9xe', myInit)
  .then(res => res.json())
  .then(response =>{
    var arr = response.dataset_data.data.reverse()
    //for (var i=1200;i<arr.length;i++){
      for (var i=arr.length-30;i<arr.length;i++){
      var x = Date.parse(arr[i][0])
      var y = arr[i][4]
      data.push({x, y})
   }
    this.setState({data:data})
    console.log(data)
  })}

  render() {
    const {crosshairValues, heldValue} = this.state;
    return (
      <div>
        <XYPlot
          onMouseDown={() => {
            if (heldValue) {
              this.setState({heldValue: false});
              return;
            }
            this.setState({heldValue: crosshairValues});
          }}
          xType="time"
          onMouseLeave={() => this.setState({crosshairValues: []})}
          width={1200}
          height={800}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {/*<LineSeries
            onNearestX={(value, {index}) => {
              this.setState({crosshairValues: DATA.map(d => d[index])});
            }}
            data={DATA[0]}/>*/}
          <LineSeries 
            onNearestX={(value, {index}) => {
              this.setState({crosshairValues: this.state.data.map(d => d[index])});
            }}
            data={this.state.data}/>
          <Crosshair values={heldValue || crosshairValues}/>
        </XYPlot>
      </div>
    );
  }
}