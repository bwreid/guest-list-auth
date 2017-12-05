const db = require('../db')
const Model = require('./Model')('users')

class User extends Model {
  static login (email, password) {
    return db('users').where({ email }).first()
    .then(user => {
      if (user.password === password) {
        return user
      } else {
        throw new Error(`User authentication failed`)
      }
    })
  }

  static signup (email, password) {
    return db('users').where({ email }).first()
    .catch(dberror=>{
      throw
    })
    .then(user => {
      if (user) {
        throw { status: 400, message: `Email has already been taken` }
      } else {
        return User.create({ email, password })
      }
    })

  }
}

module.exports = User
