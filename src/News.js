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
    const {title, date, series} = this.state;
    var username = "62f863e182736402fd729bc2dcdfa160";
    var password = "e7ae8da36d32633febfac0b6b295b45b";
    var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
    var url = 'https://api.intrinio.com/press_releases?identifier='+ this.props.ticker
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
        console.log(response)
        //result.forEach(key => this.setState({title: key.title, 
                                            //date: key.date}))
        this.setState({series: result})   
    })
}
    componentDidMount(){
        this.grabNews()

    }


render() {
const {ticker} = this.props;
const {title, date, series} = this.state;
    return (
      <div className="news">
        <h1>Latest news for {ticker}</h1>

        {
                series.map((key, i) => {
                    return  <div className="cards" key={i} >
                            <li>{key.title}</li>
                            <li>{key.date}</li>
                            </div>
                })
            }

      </div>
    );
  }
}