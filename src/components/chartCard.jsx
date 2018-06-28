import React from 'react';

const canvas = document.getElementById("canvas");

function generateAxis(props) {
    return Object.keys(props).map(function(key, index) {
      const convertDate = new Date(props[key].time * 1000).getHours();
      const prettyDate = convertDate + ':00';
      const daysOfTheWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
      const day = daysOfTheWeek[new Date(props[key].time * 1000).getDay()];
      const price = props[key].close
      return (
      <div className="chartCard__tick">
        <span className="day-number">{prettyDate}</span>
        <span className="day-name">{day}</span>
        <span className="value value--this">${price}</span>
      </div>
      );
});
}

const chartCard = props => {
const coinHistory = {...props.coinHistory}
return (
  <div className="chartCard">
    <div className="chartCard__about">
      <h3>Today in {props.name}</h3>
      <p className="chartCard__lead">Price in USD</p>
    </div>

    <canvas id="canvas"></canvas>

    <div className="chartCard__axis">
    {generateAxis(coinHistory)}
    </div>
  </div>
  )};

export default chartCard;
