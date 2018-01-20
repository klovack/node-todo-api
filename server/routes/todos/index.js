const router = require('express').Router();
const _ = require('lodash');
const bodyParser = require('body-parser');

const { mongoose } = require('../../db/mongoose');
const { Todo } = require('../../models/todo');
const { authenticate } = require('../../middleware/authenticate');
const { ObjectID } = require('mongodb'); 

router.use(bodyParser.json());

router.post('/', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
  });

  todo.save().then(
    (doc) => {
      res.send(doc); 
    }
    , (e) => {
      res.status(400).send(e);
    },
  ).catch(e => console.log(e));
});

router.get('/', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id,
  }).then((todos) => {
    res.send({
      todos,
    });
  }, (e) => {
    res.status(400).send(e);
  }).catch(e => console.log(e));
});

router.get('/:id', authenticate, (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id,
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    return res.status(200).send({ todo });
  }).catch(e => 
    res.status(400).send());
});

router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id,
  })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      return res.status(200).send({ todo });
    }).catch(e => res.status(400).send());
});

router.patch('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id,
  }, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      return res.send({ todo });
    }).catch(e => res.status(400).send());
});

module.exports = router;
