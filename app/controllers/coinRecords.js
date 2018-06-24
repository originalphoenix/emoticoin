const mongoose = require('mongoose'),
  CoinRecord = mongoose.model('CoinRecord');

exports.AllRecords = function(req, res) {
  CoinRecord.find({}, function(err, coin) {
    console.log(coin);
    if (err) res.send(err);
    console.log(res.body);
    res.json(coin);
  });
};

exports.getCoin = function(req, res) {
  CoinRecord.find({ coinName: req.params.coinName }, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
