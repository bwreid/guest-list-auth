const { promisify } = require('util')
const { verify } = require('jsonwebtoken')
const verifyAsync = promisify(verify)

class Auth {
  static isAuthenticated (token) {
    const secret = process.env.SECRET_KEY
    return verifyAsync(token, secret)
  }

  static isUser (id, token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.id != id) throw new Error(`You are not authorized to access that route`)

      return payload
    })
  }

  static isVip (token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.role === 'user') throw new Error(`You are not authorized to access that route`)

      return payload
    })
  }

  static isAdmin (id, token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.role !== 'admin') throw new Error(`You are not authorized to access that route`)

      return payload
    })
  }
}

module.exports = Auth
