const Auth = require('../models/Auth.model')
const Token = require('../models/Token.model')

class AuthController {
  static isAuthenticated (req, res, next) {
    const bearer = req.headers.authorization
    Auth.isAuthenticated(bearer)
    .then(() => next())
    .catch(next)
  }

  static isUser (req, res, next) {
    const bearer = req.headers.authorization
    Auth.isUser(req.params.id, bearer)
    .then(() => next())
    .catch(next)
  }

  static isAdmin (req, res, next) {
    const bearer = req.headers.authorization
    Auth.isAdmin(req.params.id, bearer)
    .then(() => next())
    .catch(next)
  }
}

module.exports = AuthController
