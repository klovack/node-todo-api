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

  // deleteMany
  // db.collection('todos')
  //   .deleteMany({
  //     text: 'Eat dinner',
  //   })
  //   .then(result => console.log(result));

  // deleteOne
  // db.collection('todos')
  //   .deleteOne({
  //     text: 'Eat dinner',
  //   })
  //   .then(result => console.log(result));

  // findOneAndDelete
  // db.collection('todos')
  //   .findOneAndDelete({
  //     completed: true,
  //   })
  //   .then(result => console.log(result));
  
  db.collection('users')
    .deleteMany({
      name: 'Rizki',
    })
    .then(result => console.log(result));

  db.collection('users')
    .findOneAndDelete({
      _id: new ObjectID('5a4b799519eaee0966751c41'),
    })
    .then(result => console.log(result));

  // return client.close();
  return null;
});
