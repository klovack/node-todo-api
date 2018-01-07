const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// }).catch((e) => {
//   console.log(e);
// });

Todo.findByIdAndRemove('5a529b9998c573227db5edae')
  .then((todo) => {
    console.log(todo);
  }).catch((e) => {
    console.log(e);
  });
