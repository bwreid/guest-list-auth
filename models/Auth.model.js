const { verify } = require('jsonwebtoken')
const { promisify } = require('util')
const verifyAsync = promisify(verify)

class Auth {
  static isAuthenticated (token) {
    const secret = process.env.SECRET_KEY
    return verifyAsync(token, secret)
  }

  static isUser (id, token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.id == id) {
        return payload
      } else {
        throw new Error()
      }
    })
  }

  static isVip (token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.role !== 'user') {
        return payload
      } else {
        throw new Error()
      }
    })
  }

  static isAdmin (id, token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.role === 'admin') {
        return payload
      } else {
        throw new Error()
      }
    })
  }
}

module.exports = Auth
