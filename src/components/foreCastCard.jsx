import React from 'react';
import Mood from './../helpers/moodEmote.js';

const ForeCastCard = props => (
  (
  <div className="forecast-card">
      <div className="card__flipper">
        <div className="card__front">
          <p className="card__name"><span>{props.coinName}</span><br></br>YESTERDAY</p>
          <p className="card__num">{Mood(props.sentiment.overAll)}
</p>
        </div>
      </div>
  </div>
  )
);

export default ForeCastCard;
