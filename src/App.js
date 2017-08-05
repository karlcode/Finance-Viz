import React, { Component } from 'react';
import './App.css';
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import { push as LeftMenu, push as RightMenu  } from 'react-burger-menu';
import News from './News'
import PropTypes from 'prop-types';
import left from './leftmenustyle'
import right from './rightmenustyle'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  makeWidthFlexible,
  LineSeries,
  VerticalBarSeries,
  DiscreteColorLegend,
  Crosshair
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

var myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*, *",
});
class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    crosshairValues: [],
    ticker: 'TSLA',
    series: [
      {
        title: 'AAPL',
        disabled: false,
        data: [],
        
      }
    ]
  }
  grabData(){
    const {series, ticker} = this.state;
    var result = []
    var myInit = {method: 'GET',
                  headers: myHeaders,
                  mode: 'cors',
                  cache: 'force-cache' };
    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+ ticker +'/data.json?api_key=UXBsxuWqVeC2jAzbA9xe'
    fetch(url, myInit)
    .then(res => res.json())
    .then(response =>{
      var arr = response.dataset_data.data.reverse()
      //for (var i=1200;i<arr.length;i++){
      //for (var i=arr.length-30;i<arr.length;i++){
        for (var i=arr.length-300;i<arr.length;i++){
        var x = Date.parse(arr[i][0])
        var y = arr[i][4]
        result.push({x, y})
    }
      series.forEach(s => {
      s.data = result;
      });
      this.setState({series})
  })}

  componentDidMount(){
      this.grabData()
  }

  componentDidUpdate(prevProps, prevState) {
      const {ticker, series} = this.state;
      console.log(ticker)
      if(ticker !== prevState.ticker){
        this.grabData()
        this.setState({ticker})
      }
  }


  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {number} index Index of the series.
   * @private
   */
  _nearestXHandler = (value, {index}) => {
    const {series} = this.state;
    this.setState({
      crosshairValues: series.map(s => s.data[index])
    });
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _mouseLeaveHandler = () => {
    this.setState({crosshairValues: []});
  }

  /**
   * Format the title line of the crosshair.
   * @param {Array} values Array of values.
   * @returns {Object} The caption and the value of the title.
   * @private
   */
  _formatCrosshairTitle = (values) => {
    const {ticker} = this.state;
    return {
      title: ticker + ' Date',
      value: new Date(values[0].x).toUTCString().split(' ').slice(0, 4).join(' ')
    };
  }

  /**
   * A callback to format the crosshair items.
   * @param {Object} values Array of values.
   * @returns {Array<Object>} Array of objects with titles and values.
   * @private
   */
  _formatCrosshairItems = (values) => {
    const {series, ticker} = this.state;
    return values.map((v, i) => {
      return {
        title: 'Closing Price',
        value:  v.y + ' USD'
      };
    });
  }

  /**
   * Click handler for the legend.
   * @param {Object} item Clicked item of the legend.
   * @param {number} i Index of the legend.
   * @private
   */
  _legendClickHandler = (item, i) => {
    const {series} = this.state;
    series[i].disabled = !series[i].disabled;
    this.setState({series});
  }
  handleSubmit(event) {
    this.setState({ticker: this.element.value})
    event.preventDefault();

  }
  logChange = (val) => {
    this.setState({ticker: val.value})
  console.log("Selected: " + JSON.stringify(val));
  }
  showSettings (event) {
      event.preventDefault();

  }
  _clicked = (e)=>{
    this.setState({ticker: e.value})
  }
  
  render() {
    const {forFrontPage} = this.props;
    const {series, crosshairValues} = this.state;
    var options = [
  { value: 'TSLA', label: 'Tesla' },
  { value: 'AAPL', label: 'Apple' },
  { value: 'GOOG', label: 'Alphabet Inc (Google)' },
  { value: 'MSFT', label: 'Microsoft' },
  { value: 'FB', label: 'Facebook' },
  { value: 'ORCL', label: 'Oracle' },
  { value: 'INTC', label: 'Intel' },
  { value: 'CSCO', label: 'Cisco' },
  { value: 'IBM', label: 'IBM' },
  { value: 'BIDU', label: 'Baidu' }
  ];

    return (
      <div className="App" id="outer-container">
         
        <div className="search">
          <LeftMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } styles={left}>
            {
            options.map((key, i) => {
                return  <div className="cards" key={key.value} onClick={this._clicked.bind(this, key)} >
                        <li><b>{key.value}</b></li>
                        <li>{key.label}</li>
                        </div>
            })
            }
          </LeftMenu>
          <RightMenu right pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } styles={right}>
            <News ticker={this.state.ticker}/>
          </RightMenu>
          <form onSubmit={this.handleSubmit}>
            <h1>Search for a stock ticker</h1>
          </form>
        </div>
        
        <div className="chart" id="page-wrap">
          <FlexibleXYPlot
            xType="time"
            animation
            onMouseLeave={this._mouseLeaveHandler}
            height={800}>
            <HorizontalGridLines />
            <YAxis className="cool-custom-name"/>
            <XAxis className="even-cooler-custom-name"/>
            <LineSeries
              data={series[0].data}
              onNearestX={this._nearestXHandler}
              {...(series[0].disabled ? {opacity: 0.2} : null)}/>
            <Crosshair
              itemsFormat={this._formatCrosshairItems}
              titleFormat={this._formatCrosshairTitle}
              values={crosshairValues}/>
          </FlexibleXYPlot>
        </div>
        
  
   
      </div>
    );
  }
}

export default App;
