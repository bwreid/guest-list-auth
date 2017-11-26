const { parseToken, errorHandler } = require('../lib/auth')
const Auth = require('../models/Auth.model')

class AuthController {
  static isAuthenticated (req, res, next) {
    const token = parseToken(req.headers)
    if (!token) return errorHandler(next)()

    Auth.isAuthenticated(token)
    .then(() => next())
    .catch(errorHandler(next))
  }

  static isUser (req, res, next) {
    const token = parseToken(req.headers)
    if (!token) return errorHandler(next)()

    Auth.isUser(req.params.id, token)
    .then(() => next())
    .catch(errorHandler(next))
  }

  static isAdmin (req, res, next) {
    const token = parseToken(req.headers)
    if (!token) return errorHandler(next)()

    Auth.isAdmin(req.params.id, token)
    .then(() => next())
    .catch(errorHandler(next))
  }
}

module.exports = AuthController
