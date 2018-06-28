import React, { Component } from 'react';
import { Chart } from 'react-chartjs-2';
import './App.css';
import ForeCastCard from './components/foreCastCard';
import ChartCard from './components/chartCard';
import Nav from './components/nav';
import tickerSymbol from './helpers/dict.js';
import drawChart from './helpers/drawChart';

function ChartDataFormatter(data) {
  const labels = data.map(data => {
    const convertDate = new Date(data.time * 1000).getHours();
    const prettyDate = convertDate + ':00';
    return prettyDate;
  });
  const dataPoints = data.map(data => {
    return data.close;
  });
  drawChart(labels, dataPoints);
}

class Forecast extends Component {
  constructor(props) {
    super(props);
  }

  chartData(coinName) {
    const ticker = tickerSymbol(coinName);
    const currentTime = Math.round(new Date().getTime() / 1000);
    if (ticker) {
      const endpoint =
        'https://min-api.cryptocompare.com/data/histohour?tsym=USD&fsym=' +
        ticker.toUpperCase() +
        '&limit=23&aggregate=1&toTs=' +
        currentTime +
        '&extraParams=emoticoin';
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          this.setState({ CoinHistory: data.Data });
          ChartDataFormatter(data.Data);
        });
    }
    return 0;
  }
  componentDidMount() {
    const coinName = 'bitcoin';
    if (coinName) {
      this.chartData(coinName);
    }
  }
  render() {
    const coin = this.props.coin;
    const price = coin && coin.marketData.price;
    const coinHistory = this.state && this.state.CoinHistory;
    const coinName = this.props.coin && this.props.coin.coinName;
    const ticker = tickerSymbol(coinName);
    return (
      <div className="forecastContainer">
        <div className="row rowTitle">
          <h1 className="foreCast">
            Coin Forecast: {coinName} ({ticker})
          </h1>
          <h2 className="foreCast-buyStatus">
            <span className="price">${price}</span>HOLD
          </h2>
        </div>
        <div className="row">
          {coin ? <ForeCastCard id={coin._id} {...coin} /> : null}
        </div>
        <div className="row">
          <ChartCard
            coinHistory={coinHistory || {}}
            name={coinName || 'N/A'}
            ticker={ticker || 'N/A'}
          />
        </div>
      </div>
    );
  }
}

export default Forecast;
