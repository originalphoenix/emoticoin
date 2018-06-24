import React, { Component } from 'react';
import './App.css';
import CoinCard from './components/Card';
import Nav from './components/nav';

const CoinAPI = 'http://localhost:5000/coins';

function openNav() {
  if (document.getElementById('mySidenav')) {
    document.getElementById('mySidenav').style.width = '20%';
    document.getElementById('body').style.paddingLeft = '20%';
    document.getElementById('header').style.display = 'none';
  }
}

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CoinData: [],
      Analysis: []
    };
  }

  componentDidMount() {
    fetch(CoinAPI)
      .then(response => response.json())
      .then(data => this.setState({ CoinData: data }));
  }
  render() {
    const coinData = this.state && this.state.CoinData;
    const uniqueCoins = removeDuplicates(coinData, 'coinName');
    return (
      <div className="App">
        <Nav />
        <header id="header">
          <h1 className="logo">emoticoin</h1>
          <i className="material-icons navButton" onClick={openNav}>
            menu
          </i>
        </header>
        <div className="body" id="body">
          {uniqueCoins.map(coin => <CoinCard id={coin._id} {...coin} />)}
        </div>
      </div>
    );
  }
}

export default App;
