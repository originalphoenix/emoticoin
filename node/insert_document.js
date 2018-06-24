MongoClient.connect(
  MongoUrl,
  function(err, db) {
    if (err) throw err;
    var dbo = db.db('emoticoin');
    var myobj = { coinName: keyword, emotiveScore: overAllScore };
    dbo.collection('bitcoin').insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  }
);
