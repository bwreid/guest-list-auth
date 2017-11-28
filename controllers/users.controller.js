const { TABLE_NAMES } = require('../constants')
const User = require('../models/User.model')
const Controller = require('./Controller')(TABLE_NAMES.USER)

class UsersController extends Controller {
  static login (req, res, next) {
    const { email, password } = req.body
    User.login(email, password)
    .then(token => res.json({ token }))
    .catch(next)
  }

  static signup (req, res, next) {
    const { email, password } = req.body
    User.signup(email, password)
    .then(user => res.json({ user }))
    .catch(next)
  }
}

module.exports = UsersController
