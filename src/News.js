import React, { Component } from 'react'
import './App.css'

var myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*, *",
});

export default class News extends Component {
state = {
    title: 'Nothing yet',
    date: '',
  }
grabNews(){
    const {title, author} = this.state;
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
        var arr = response
        for (var i=0;i<arr.length;i++){
        var tit = arr.data[0].title
        var y = arr[i][4]
        }
    this.setState({title: response.data[0].title,
                    date: response.data[0].publication_date})
        console.log(response)
        console.log(response.data[0].title)
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