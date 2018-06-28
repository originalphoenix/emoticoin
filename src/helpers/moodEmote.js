import React from 'react';

function Mood(sentimentScore) {
  if (sentimentScore > 0) {
    return <h1>:)</h1>;
  }
  return <h1>:(</h1>;
}

export default Mood;
