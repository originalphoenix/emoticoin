import React, { Component } from 'react';
import { Chart } from 'react-chartjs-2';
import './App.css';
import CoinCard from './components/Card';

const LeaderBoard = props => {
  console.log(props);
  return (
    <div className="body" id="body">
      {props.coinData.map(coin => <CoinCard id={coin._id} coinData={coin} />)}
    </div>
  );
};

export default LeaderBoard;
