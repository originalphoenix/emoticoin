import React from 'react';

function MoodClass(props) {
const sentimentScore = props.sentiment.overAll;
if (sentimentScore > 0) {
  return 'card__emotion-happy';
}
return 'card__emotion-sad';
}

function Mood(props) {

  const sentimentScore = props.sentiment.overAll;
  if (sentimentScore > 0) {
    return (
      <h1>:)</h1>
    );
  }
  return (
    <h1>:(</h1>
  );
}

const CoinCard = props => (
  (
  <div className="wrapper">
  <div className={ 'card ' + MoodClass(props)}>
  <div className={'card__emotion ' + MoodClass(props)}>
    {Mood(props)}
  </div>
    <div className="card__level">{props.marketData.price}</div>
    <div className="card__unit-name">{props.coinName}</div>

    <div className="card__unit-stats clearfix">
      <div className="one-third">
        <div className="stat">{Mood(props)}<sup>?</sup></div>
        <div className="stat-value">Twitter</div>
      </div>

      <div className="one-third">
        <div className="stat">{Mood(props)}</div>
        <div className="stat-value">Reddit</div>
      </div>

      <div className="one-third no-border">
        <div className="stat">{Mood(props)}</div>
        <div className="stat-value">News</div>
      </div>
    </div>
  </div>
</div>
  )
);

export default CoinCard;
