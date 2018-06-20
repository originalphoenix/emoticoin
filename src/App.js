import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinCard from './components/Card';

const CoinData = 'https://min-api.cryptocompare.com/data/pricemultifull?';

const CoinData_Query = 'fsyms=BTC,ETH,LTC&tsyms=USD';

const Twitter_Analysis = 'http://localhost:5000/api/twitter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CoinData: [],
      Analysis: []
    };
  }

  componentDidMount() {
    fetch(CoinData + CoinData_Query)
      .then(response => response.json())
      .then(data => this.setState({ CoinData: data.DISPLAY }));
    fetch(Twitter_Analysis)
      .then(res => res.json())
      .then(json => this.setState({ Analysis: json.express }))
      .catch(err => console.log(err));
  }
  render() {
    const thisData = this.state && this.state.CoinData;
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="body">
          {Object.keys(thisData).map(coinData => (
            <CoinCard {...thisData[coinData].USD} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
