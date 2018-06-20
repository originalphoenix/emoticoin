const Twit = require('twit');
const dotenv = require('dotenv');
const colors = require('colors/safe');
const Sentiment = require('sentiment');
const express = require('express');
const fetch = require('node-fetch');
const snoowrap = require('snoowrap');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

dotenv.config();

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
  REDDIT_USER_AGENT,
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_REFRESH_TOKEN
} = process.env;

const config_twitter = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
};

const r = new snoowrap({
  userAgent: REDDIT_USER_AGENT,
  clientId: REDDIT_CLIENT_ID,
  clientSecret: REDDIT_CLIENT_SECRET,
  refreshToken: REDDIT_REFRESH_TOKEN
});

let api = new Twit(config_twitter);
let overAllScore = 0;

function get_text(tweet) {
  let txt = tweet.retweeted_status
    ? tweet.retweeted_status.full_text
    : tweet.full_text;
  return txt
    .split(/ |\n/)
    .filter(v => !v.startsWith('http'))
    .join(' ');
}

async function get_tweets(q, count) {
  let tweets = await api.get('search/tweets', {
    q,
    count,
    tweet_mode: 'extended'
  });
  return tweets.data.statuses.map(get_text);
}

async function search_reddit(keyword) {
  let posts = await r.search({ query: keyword }).map(post => post.title);
  return posts;
}

async function twitterAnalysis() {
  let keyword = 'bitcoin';
  let count = 100;
  let sentimentScores = [];
  let tweets = await get_tweets(keyword, count);
  const sentiment = new Sentiment();
  for (tweet of tweets) {
    let score = sentiment.analyze(tweet).comparative;
    sentimentScores.push(score);
  }
  let overAllScore = sentimentScores.reduce((a, b) => a + b, 0);
  console.log(overAllScore);
}

async function redditAnalysis() {
  let keyword = 'bitcoin';
  let sentimentScores = [];
  let posts = await search_reddit(keyword);
  const sentiment = new Sentiment();
  for (post of posts) {
    let score = sentiment.analyze(post).comparative;
    sentimentScores.push(score);
  }
  let overAllScore = sentimentScores.reduce((a, b) => a + b, 0);
  console.log(overAllScore);
}

async function getMarketData() {
  let marketDataRaw = await fetch(
    'https://chasing-coins.com/api/v1/std/coin/BTC'
  ).then(res => res.json());
  return marketDataRaw;
}

app.get('/api/twitter', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
twitterAnalysis();
redditAnalysis();
getMarketData();
