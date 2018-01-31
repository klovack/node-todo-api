const router = require('express').Router();
const _ = require('lodash');
const bodyParser = require('body-parser');

const { mongoose } = require('../../db/mongoose');
const { User } = require('../../models/user');
const { authenticate } = require('../../middleware/authenticate');

router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);
  
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.get('/', (req, res) => {
  User.find().then(users => res.send({
    users,
  }), e => res.status(400).send(e))
    .catch(e => console.log(e));
});

router.get('/me', authenticate, (req, res) => res.send(req.user));

router.post('/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
  
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete('/me/logout', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
