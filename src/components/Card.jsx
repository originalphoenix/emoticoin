import React from 'react';
import { Link } from 'react-router-dom';
import Mood from './../helpers/moodEmote';


function MoodClass(sentimentScore) {
if (sentimentScore > 0) {
  return 'card__emotion-happy';
}
return 'card__emotion-sad';
}

const CoinCard = props => {
 const sentiment = props && props.coinData.sentiment;
return(
  (
  <div className="wrapper">
  <Link to={`/forecast/${props.coinData.coinName}`}>
  <div className={ 'card ' + MoodClass(sentiment.overAll)}>
  <div className={'card__emotion ' + MoodClass(sentiment.overAll)}>
    {Mood(sentiment.overAll)}
  </div>
    <div className="card__level">${props.coinData.marketData.price}</div>
    <div className="card__unit-name">{props.coinData.coinName}</div>

    <div className="card__unit-stats clearfix">
      <div className="one-third">
        <div className="stat">{Mood(sentiment.twitter)}<sup>?</sup></div>
        <div className="stat-value">Twitter</div>
      </div>

      <div className="one-third">
        <div className="stat">{Mood(sentiment.reddit)}</div>
        <div className="stat-value">Reddit</div>
      </div>

      <div className="one-third no-border">
        <div className="stat">      <h1>:|</h1>
</div>
        <div className="stat-value">News</div>
      </div>
    </div>
  </div>
  </Link>
</div>
  )
)};

export default CoinCard;
