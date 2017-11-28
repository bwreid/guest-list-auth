const { TABLE_NAMES } = require('../constants')
const db = require('../db')
const Model = require('./Model')(TABLE_NAMES.USER)

const { sign } = require('jsonwebtoken')
const { promisify } = require('util')
const signAsync = promisify(sign)

class User extends Model {
  static login (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (user.password === password) {
        const { id, role } = user
        const sub = { id, role }
        const expiresIn = '30 days'
        const secret = process.env.SECRET_KEY

        return signAsync({ sub }, secret, { expiresIn })
      } else {
        throw new Error(`User authentication failed`)
      }
    })
  }

  static signup (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (user) {
        throw new Error(`Email has already been taken`)
      } else {
        return User.create({ email, password })
      }
    }).catch(() => { throw new Error() })
  }
}

module.exports = User
