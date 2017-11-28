require('dotenv').load()
const { sign } = require('jsonwebtoken')

class Token {
  constructor ({ id, role }) {
    this.sub = { sub: { id, role } }
    this.secret = process.env.SECRET_KEY
    this.options = { expiresIn: '30 days' }
  }

  get value () {
    return sign(this.sub, this.secret, this.expiresIn)
  }
}

module.exports = Token
