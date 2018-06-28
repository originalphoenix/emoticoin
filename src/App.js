import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import './App.css';
import Nav from './components/nav';
import tickerSymbol from './helpers/dict';
import LeaderBoard from './LeaderBoard';
import Forecast from './Forecast';

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
    const coinData = this.state.CoinData;
    const coinHistory = this.state.CoinHistory;
    const uniqueCoins = removeDuplicates(coinData, 'coinName');
    return (
      <div className="App">
        <Nav />
        <header id="header">
          <a href="/">
            <h1 className="logo">emoticoin</h1>
          </a>
          <i className="material-icons navButton" onClick={openNav}>
            menu
          </i>
        </header>
        <div className="body" id="body">
          <BrowserRouter>
            <div className="app">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={props =>
                    uniqueCoins ? (
                      <LeaderBoard coinData={uniqueCoins} {...props} />
                    ) : (
                      <h1>loading</h1>
                    )
                  }
                />
                <Route
                  path="/forecast/:coinName"
                  component={props => {
                    const selectedCoin = this.state.CoinData.find(
                      coin => props.match.params.coinName === coin.coinName
                    );
                    return <Forecast coin={selectedCoin} {...props} />;
                  }}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
