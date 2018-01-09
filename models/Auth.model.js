const Token = require('./Token.model')

class Auth {
  static isAuthenticated (token) {
    return Token.parseToken(token)
  }

  // is the user the specific user
  static isTheUser (id, token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.id != id) throw new Error(`You are not authorized to access that route`)

      return payload
    })
  }

  // is the user a vip level
  static isVip (token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.role === 'user') throw new Error(`You are not authorized to access that route`)

      return payload
    })
  }

  static isAdmin (token) {
    return Auth.isAuthenticated(token).then(payload => {
      if (payload.sub.role !== 'admin') throw new Error(`You are not authorized to access that route`)

      return payload
    })
  }
}

module.exports = Auth
