const bcrypt = require('bcryptjs')
const db = require('../db')
const Model = require('./Model')('users')

class User extends Model {
  static login (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (!user) throw new Error(`User authentication failed`)

      const isValidPassword = bcrypt.compareSync(password, user.password)
      if (!isValidPassword) throw new Error(`User authentication failed`)

      delete user.password
      return user
    })
  }

  static signup (email, password) {
    return db('users').where({ email }).first().then(user => {
      if (user) throw new Error(`User signup failed`)
      if (!password) throw new Error(`User signup failed`)

      password = bcrypt.hashSync(password)
      return User.create({ email, password })
    }).catch(() => { throw new Error() })
  }

  static update (id, body) {
    if (body.password) body.password = bcrypt.hashSync(password)
    return User.update(id, body)
  }
}

module.exports = User
