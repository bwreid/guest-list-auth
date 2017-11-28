require('dotenv').load()
const { promisify } = require('util')
const { sign, verify } = require('jsonwebtoken')
const verifyAsync = promisify(verify)

class Token {
  constructor ({ id, role }) {
    this.sub = { sub: { id, role } }
    this.secret = process.env.SECRET_KEY
    this.options = { expiresIn: '30 days' }
  }

  get value () {
    return sign(this.sub, this.secret, this.expiresIn)
  }

  static parseTokenFromBearerAsync (bearer) {
    const token = bearer ? bearer.replace('Bearer ', '') : null
    return verifyAsync(token, process.env.SECRET_KEY)
  }
}

module.exports = Token
