const { TABLE_NAMES } = require('../constants')
const db = require('../db')
const Model = require('./Model')(TABLE_NAMES.USER)
const Token = require('./Token.model')

class User extends Model {
  static login (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (user.password !== password) throw new Error()

      const token = new Token(user)
      return token.value
    }).catch(() => { throw new Error(`User authentication failed`) })
  }

  static signup (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (user) throw new Error()

      return User.create({ email, password })
    }).catch(() => { throw new Error(`User signup failed`) })
  }
}

module.exports = User
