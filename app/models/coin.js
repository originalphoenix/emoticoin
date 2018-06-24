'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoinSchema = new Schema(
  {
    coinName: {
      type: String,
      required: 'plaintext english name of coin used for sentiment searches'
    },
    sentiment: {
      twitter: {
        type: Number,
        required: 'twitter sentiment score'
      },
      reddit: {
        type: Number,
        required: 'reddit sentiment score'
      },
      overAll: {
        type: Number,
        required: 'reddit + twitter sentiment score'
      }
    },
    marketData: {
      price: {
        type: Number,
        required: 'price when this sentiment was taken'
      },
      change: {
        type: Number,
        required: 'how much the coin has changed (hourly)'
      }
    },
    name: {
      type: String,
      required: 'Kindly enter the name of the task'
    }
  },
  { collection: 'coinData' }
);

module.exports = mongoose.model('CoinRecord', CoinSchema);
