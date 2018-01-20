require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');  

const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const port = process.env.PORT;

const app = express();

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
