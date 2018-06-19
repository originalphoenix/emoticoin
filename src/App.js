import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinCard from './components/Card';

const CoinData = 'https://min-api.cryptocompare.com/data/pricemultifull?';

const DEFAULT_QUERY = 'fsyms=BTC,ETH,LTC&tsyms=USD';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: []
    };
  }

  componentDidMount() {
    fetch(CoinData + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ response: data.DISPLAY }));
  }
  render() {
    const thisData = this.state && this.state.response;
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
