// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db(dbName);

  // findOneAndUpdate
  // db.collection('todos')
  //   .findOneAndUpdate({
  //     _id: new ObjectID('5a4afc24339c2e6d2eff6e56'),
  //   }, {
  //     $set: {
  //       completed: true,
  //     }
  //   }, {
  //     returnOriginal: false,
  //   })
  //   .then(result => console.log(result));

  db.collection('users')
    .findOneAndUpdate({
      _id: new ObjectID('5a4afd47f1a8b06d97f6d5e0'),
    }, {
      $set: {
        name: 'Rizki',
      },
      $inc: {
        age: -6,
      },
    }, {
      returnOriginal: false,
    })
    .then(result => console.log(result));

  // return client.close();
  return null;
});
