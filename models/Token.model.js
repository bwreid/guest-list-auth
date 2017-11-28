const { promisify } = require('util')
const { sign, verify } = require('jsonwebtoken')
const verifyAsync = promisify(verify)
const secret = process.env.SECRET_KEY

class Token {
  static signToken ({ id, role }) {
    const sub = { id, role }
    const expiresIn = '30 days'
    return sign({ sub }, secret, { expiresIn })
  }

  static parseTokenFromBearerAsync (bearer) {
    const token = bearer ? bearer.replace('Bearer ', '') : null
    return verifyAsync(token, process.env.SECRET_KEY)
  }
}

module.exports = Token
