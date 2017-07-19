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
grabNews(){
    var result = []
    const {title, date} = this.state;
    var username = "62f863e182736402fd729bc2dcdfa160";
    var password = "e7ae8da36d32633febfac0b6b295b45b";
    var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
    var url = 'https://api.intrinio.com/press_releases?identifier=FB'
    var myInit = {method: 'GET',
                  headers: {myHeaders,
                            "Authorization" : auth},
                  mode: 'cors',
                  cache: 'force-cache' };
    fetch(url, myInit)
    .then(res => res.json())
    .then(response =>{
        for (var i=0; i<response.data.length; i++){
        var title = response.data[i].title
        var date = response.data[i].publication_date
        result.push({title, date})
        }
        console.log(result)
        result.forEach(key => this.setState({title: key.title, 
                                            date: key.date}))
 
    })
}
    componentDidMount(){
        this.grabNews()

    }

render() {
const {ticker} = this.props;
const {title, date} = this.state;
    return (
      <div className="news">
        <h1>Latest news for {ticker}</h1>
        <h6>{title}</h6>
        <span>{date}</span>
      </div>
    );
  }
}