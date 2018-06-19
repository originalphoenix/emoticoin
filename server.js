const WebSocket = require('ws');

var ws = new WebSocket('wss://ws.coinapi.io/v1/');
ws.on('open', function open() {
  var hello = {
    type: 'hello',
    apikey: '3D0D5A34-B53D-4B9D-981A-2725542EC777',
    heartbeat: false,
    subscribe_data_type: ['quote'],
    subscribe_filter_asset_id: ['BTC', 'ETH']
  };
  ws.send(JSON.stringify(hello));
});

ws.on('message', function incoming(data) {
  console.log(data);
});
