const constants = require('../constants')
const User = require('../models/User.model')
const Controller = require('./Controller')(constants.tableNames.User)

class UsersController extends Controller {
  static login (req, res, next) {
    const { email, password } = req.body
    User.login(email, password)
    .then(user => res.json({ user }))
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
      next({status: error.status || 500, message: error.message || `Please check your email and password`})
    })
  }
}

module.exports = UsersController
