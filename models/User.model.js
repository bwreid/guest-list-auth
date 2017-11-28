const { TABLE_NAMES } = require('../constants')
const db = require('../db')
const Model = require('./Model')(TABLE_NAMES.USER)

const { promisify } = require('util')
const { sign } = require('jsonwebtoken')
const signAsync = promisify(sign)

class User extends Model {
  static login (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (user.password !== password) throw new Error(`User authentication failed`)

      const { id, role } = user
      const sub = { id, role }
      const secret = process.env.SECRET_KEY
      const expiresIn = '30 days'

      return signAsync({ sub }, secret, { expiresIn })
    }).catch(error => { throw new Error(error) })
  }

  static signup (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (user) throw new Error(`Email has already been taken`)

      return User.create({ email, password })
    }).catch(error => { throw new Error(error) })
  }
}

module.exports = User
