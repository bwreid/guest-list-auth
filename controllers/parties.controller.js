const { TABLE_NAMES } = require('../constants')
const Auth = require('../models/Auth.model')
const Party = require('../models/Party.model')
const Controller = require('./Controller')(TABLE_NAMES.PARTY)

class PartiesController extends Controller {
  static index (req, res, next) {
    const bearer = req.headers.authorization
    Auth.isVip(bearer)
    .then(() => Party.all())
    .catch(() => Party.all().where({ isVip: false }))
    .then(parties => res.json({ parties }))
  }

  static show (req, res, next) {
    Party.find(req.params.id).then(party => {
      if (!party.isVip) return res.json({ party })

      const bearer = req.headers.authorization
      return Auth.isVip(bearer)
      .then(() => res.json({ party }))
      .catch(next)
    })
  }
}

module.exports = PartiesController
