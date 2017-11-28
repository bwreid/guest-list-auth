const Token = require('./Token.model')

class Auth {
  static isAuthenticated (token) {
    return Token.parseTokenFromBearerAsync(token).catch(error => {
      throw new Error(`You are not authorized to access that route`)
    })
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
