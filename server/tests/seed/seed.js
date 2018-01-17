const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  // valid user with valid token
  _id: userOneId,
  email: 'rizki@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString(),
  }],
}, {
  // valid user with invalid token
  _id: userTwoId,
  email: 'vitri@example.com',
  password: 'userTwoPass',
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123,
}];

const populateTodos = (done) => {
  Todo.remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done())
    .catch(e => console.log(e));
};

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports.todos = todos;
module.exports.populateTodos = populateTodos;
module.exports.users = users;
module.exports.populateUsers = populateUsers;
