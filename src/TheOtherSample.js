import React, { Component } from 'react'

import PropTypes from 'prop-types';

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

export default class Example extends Component {
constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    crosshairValues: [],
    ticker: 'TSLA',
    series: [
      {
        title: 'AAPL',
        disabled: false,
        data: []
      },
      {
        title: 'Bananas',
        disabled: false,
        data: []
      }
    ]
  }
  
  componentWillMount(){
    const {series, ticker} = this.state;
      var result = []
      var myInit = {method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'force-cache' };
    fetch('https://www.quandl.com/api/v3/datasets/WIKI/'+ ticker +'/data.json?api_key=UXBsxuWqVeC2jAzbA9xe', myInit)
    .then(res => res.json())
    .then(response =>{
      var arr = response.dataset_data.data.reverse()
      //for (var i=1200;i<arr.length;i++){
        for (var i=arr.length-30;i<arr.length;i++){
        var x = Date.parse(arr[i][0])
        var y = arr[i][4]
        result.push({x, y})
    }
      series.forEach(s => {
      s.data = result;
      });
      this.setState({series})
      console.log(series)
    })}
  

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
    return {
      title: 'Date',
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
    const {series} = this.state;
    return values.map((v, i) => {
      return {
        title: series[i].title,
        value: v.y
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
    alert('A name was submitted: ' + this.state.ticker);
    this.setState({ticker: 'AAPL'})
    event.preventDefault();

  }
  handleChange(event) {
    this.setState({ticker: event.target.value});
  }
  render() {
    const {forFrontPage} = this.props;
    const {series, crosshairValues} = this.state;
    return (
      <div className={!forFrontPage ? 'example-with-click-me' : ''} >
        {!forFrontPage && (<div className="legend">
          <DiscreteColorLegend
            onItemClick={this._legendClickHandler}
            width={180}
            items={series}/>
        </div>)}

        <div className="chart">
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
            <LineSeries
              data={series[1].data}
              curve="curveMonotoneX"
              {...(series[1].disabled ? {opacity: 0.2} : null)}/>
            <Crosshair
              itemsFormat={this._formatCrosshairItems}
              titleFormat={this._formatCrosshairTitle}
              values={crosshairValues}/>
          </FlexibleXYPlot>
        </div>
     <form onSubmit={this.handleSubmit}>
        <label>
          Enter a symbol {this.state.ticker}:
          <input type="text"/>
        </label>
        <input type="submit" value="Submit"  />
      </form>
      
      </div>
    );
  }
}
Example.propTypes = {
  forFrontPage: PropTypes.bool
};