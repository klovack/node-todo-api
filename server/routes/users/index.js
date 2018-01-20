const router = require('express').Router();
const _ = require('lodash');
const bodyParser = require('body-parser');

const { mongoose } = require('../../db/mongoose');
const { User } = require('../../models/user');
const { authenticate } = require('../../middleware/authenticate');

router.use(bodyParser.json());

router.post('/', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);
  
  user.save()
    .then(() => user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(user))
    .catch(e => res.status(400).send());
});

router.get('/', (req, res) => {
  User.find().then(users => res.send({
    users,
  }), e => res.status(400).send(e))
    .catch(e => console.log(e));
});

router.get('/me', authenticate, (req, res) => res.send(req.user));

router.post('/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      user.generateAuthToken()
        .then((token) => {
          res.header('x-auth', token).send(user);
        });
    })
    .catch(e => res.status(400).send());
});

router.delete('/me/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
});

module.exports = router;
