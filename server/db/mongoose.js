const mongoose = require('mongoose');

// Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(`${url}`);

module.exports = {
  mongoose,
};

