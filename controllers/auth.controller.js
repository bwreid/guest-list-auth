const Auth = require('../models/Auth.model')

class AuthController {
  static isAuthenticated (req, res, next) {
    const token = AuthController._parseToken(req.headers)
    if (!token) return AuthController._errorHandler(next)()
    Auth.isAuthenticated(token)
    .then(() => next())
    .catch(AuthController._errorHandler(next))
  }

  static isUser (req, res, next) {
    const token = AuthController._parseToken(req.headers)
    if (!token) return AuthController._errorHandler(next)()
    Auth.isUser(req.params.id, token)
    .then(() => next())
    .catch(AuthController._errorHandler(next))
  }

  static isAdmin (req, res, next) {
    const token = AuthController._parseToken(req.headers)
    if (!token) return AuthController._errorHandler(next)()
    Auth.isAdmin(req.params.id, token)
    .then(() => next())
    .catch(AuthController._errorHandler(next))
  }

  static _errorHandler (next) {
    return error => {
      if (error) console.error(error)
      const status = 401
      const message = `You do not have access to this resource`
      next({ status, message })
    }
  }

  static _parseToken (headers) {
    const auth = headers.authorization
    return auth ? auth.replace('Bearer ', '') : null
  }
}

module.exports = AuthController
