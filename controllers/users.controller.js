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

  static isAuthenticated (req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '')
    User.isAuthenticated(token)
    .then(() => next())
    .catch(() => {
      const status = 401
      const message = `Invalid credentials; please login and try again`
      next({ status, message })
    })
  }

  static isUser (req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '')
    User.isUser(req.params.id, token)
    .then(() => next())
    .catch(() => {
      const status = 401
      const message = `You do not have sufficient permissions`
      next({ status, message })
    })
  }
}

module.exports = UsersController
