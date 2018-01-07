const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const todoId = '5a526532c7294170ca39f551asd';

// if (!ObjectId.isValid(todoId)) {
//   console.log('Id not valid');
// } else {
//   Todo.find({
//     _id: todoId,
//   }).then((todos) => {
//     console.log(`Todos ${todos}`);
//   });
  
//   Todo.findOne({
//     _id: todoId,
//   }).then((todo) => {
//     console.log(`Todo ${todo}`);
//   });
  
//   Todo.findById(todoId).then((todo) => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log(`Todo ${todo}`);
//   }).catch(e => console.log(e));
// }

const userId = '5a5249bc15c9653e9e8f30f5';

User.findById(userId).then((user) => {
  if(!user) {
    return console.log('User not found');
  }

  return console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
