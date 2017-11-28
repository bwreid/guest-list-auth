const { TABLE_NAMES } = require('../constants')
const { parseToken, errorHandler } = require('../lib/auth')
const Auth = require('../models/Auth.model')
const Party = require('../models/Party.model')
const Controller = require('./Controller')(TABLE_NAMES.PARTY)

class PartiesController extends Controller {
  static index (req, res, next) {
    const token = parseToken(req.headers)

    Auth.isVip(token)
    .then(() => Party.all())
    .catch(() => Party.all().where({ isVip: false }))
    .then(parties => res.json({ parties }))
  }

  static show (req, res, next) {
    Party.find(req.params.id).then(party => {
      const token = parseToken(req.headers)
      if (!party.isVip) return res.json({ party })

      return Auth.isVip(token)
      .then(() => res.json({ party }))
      .catch(errorHandler(next))
    })
  }
}

module.exports = PartiesController
