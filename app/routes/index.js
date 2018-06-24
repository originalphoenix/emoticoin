const coinRoutes = require('./coin_routes');
module.exports = function(app, db) {
  coinRoutes(app, db);
};
