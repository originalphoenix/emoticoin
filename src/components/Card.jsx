import React from 'react';

const CoinCard = props => (
  console.log(props),
  (
    <div className="coinCard">
      <div className="emotion">
        <h1>:)</h1>
      </div>
      <div className="emotion-details">
        <p className="CoinName">{props.FROMSYMBOL}</p>
        <p className="CoinPrice">{props.PRICE}</p>
        <a>Forecast</a>
      </div>
    </div>
  )
);

export default CoinCard;
