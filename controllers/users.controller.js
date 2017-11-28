const { TABLE_NAMES } = require('../constants')
const User = require('../models/User.model')
const Controller = require('./Controller')(TABLE_NAMES.USER)

class UsersController extends Controller {
  static login (req, res, next) {
    const { email, password } = req.body
    User.login(email, password)
    .then(token => res.json({ token }))
    .catch(() => {
      const status = 401
      const message = `Please check your email and password`
      res.status(status).json({ status, message })
    })
  }

  static signup (req, res, next) {
    const { email, password } = req.body
    User.signup(email, password)
    .then(user => res.json({ user }))
    .catch(error => {
      const status = 400
      const message = error.message || `Please check your email and password`
      res.status(status).json({ status, message })
    })
  }
}

module.exports = UsersController
