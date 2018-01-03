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

  // db.collection('todos').find({ 
  //   _id: new ObjectID('5a4b7affcc523794656e0861'),
  // }).toArray().then((docs) => {
  //   console.log('todos');
  //   return console.log(JSON.stringify(docs, undefined, 2));
  // }, error => console.log('Unable to fetch todos ', error));

  // db.collection('todos')
  //   .find()
  //   .count()
  //   .then(
  //     count => console.log(`todos count: ${count}`),
  //     error => console.log('Unable to fetch todos ', error),
  //   );

  db.collection('users')
    .find({
      name: 'Rizki',
    })
    .toArray()
    .then(
      (docs) => {
        console.log('users');
        return console.log(JSON.stringify(docs, undefined, 2));
      }, 
      error => console.log('Unable to fetch users ', error),
    );

  return client.close();
});
