// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

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

  // db.collection('todos').insertOne({
  //   text: 'Something to do',
  //   completed: false,
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  // db.collection('users').insertOne({
  //   name: 'Rizki',
  //   age: 25,
  //   location: 'Trier, Germany',
  // }, (error, res) => {
  //   if (error) {
  //     return console.log('Unable to insert user ', err);
  //   }

  //   return console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  return client.close();
});
