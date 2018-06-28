const coinDict = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  ripple: 'XRP',
  'bitcoin cash': 'BCH',
  eos: 'EOS',
  litecoin: 'LTC',
  'stellar lumens': 'XLM',
  cardano: 'ADA',
  iota: 'MIOTA',
  tron: 'TRX',
  tether: 'USDT',
  neo: 'NEO',
  dash: 'DASH',
  monero: 'XMR',
  binance: 'BNB',
  vechain: 'VEN',
  'ethereum classic': 'ETC',
  ontology: 'ONT',
  qtum: 'QTUM'
};

function tickerSymbol(coinName) {
  return coinDict[coinName];
}

export default tickerSymbol;
