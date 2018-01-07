const mongoose = require('mongoose');

// Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(`${url}/${dbName}`);

module.exports = {
  mongoose,
};
