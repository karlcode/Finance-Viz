import React, { Component } from 'react'
import './App.css'

var myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*, *",
});

export default class News extends Component {
    
state = {
    series: [{
    title: 'Nothing yet',
    date: '',
    }]
  }
grabNews(props){
    var result = []
    const {title, date, series} = this.state;
    //var username = "62f863e182736402fd729bc2dcdfa160";
    //var password = "e7ae8da36d32633febfac0b6b295b45b";
    //var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
    //var url = 'https://api.intrinio.com/news?identifier='+ props 
    var url = 'http://sandbox.api.cityfalcon.com:80/v0.2/stories.json?identifier_type=tickers&identifiers=AAPL&categories=mp%2Cop&min_cityfalcon_score=15&order_by=popular&time_filter=mth1&languages=en&all_languages=false&paywall=false&registration_required=false&access_token=9e522ad481d49a67ba237d3445b5eea849576a83e8ab46f9911f30406c42f810'
    var myInit = {method: 'GET',
                  headers: {myHeaders},
                  mode: 'cors',
                  cache: 'force-cache' };
    fetch(url, myInit)
    .then(res => res.json())
    .then(response =>{
        for (var i=0; i<response.stories.length; i++){
        var title = response.stories[i].title
        var date = new Date(response.stories[i].publishTime).toUTCString().split(' ').slice(0, 4).join(' ')
        result.push({title, date})
        }
        console.log(response)
        //result.forEach(key => this.setState({title: key.title, 
                                            //date: key.date}))
        this.setState({series: result})   
    })
}

    componentDidMount(){
        this.grabNews(this.props.ticker)

    }
    componentWillReceiveProps(nextProps){
        if (this.props.ticker !== nextProps.ticker){
            this.grabNews(nextProps.ticker)
        }
    }


render() {
const {ticker} = this.props;
const {title, date, series} = this.state;
    return (
      <a>
        <h1>Latest news for {ticker}</h1>

        {
                series.map((key, i) => {
                    return  <div className="cards" key={i} >
                            <li><b>{key.date}</b></li>
                            <li>{key.title}</li>
                            
                            </div>
                })
            }

      </a>
    );
  }
}