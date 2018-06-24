module.exports = function(app) {
  const coinRecords = require('../controllers/coinRecords');

  // todoList Routes
  app.route('/coins').get(coinRecords.AllRecords);

  app.route('/coins/:coinName').get(coinRecords.getCoin);
};
