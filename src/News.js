import React, { Component } from 'react'
import './App.css'

var myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*, *",
});

export default class News extends Component {

grabNews(){
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
        var title = arr.data[0].title
        var y = arr[i][4]
        }
        console.log(response)
        console.log(response.data[0].title)
    })
}
componentDidMount(){
    this.grabNews()
}

render() {

    return (
      <div className="news">
       <h1>NEWS</h1>

      </div>
    );
  }
}