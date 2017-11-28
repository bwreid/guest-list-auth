const { TABLE_NAMES } = require('../constants')
const db = require('../db')
const Model = require('./Model')(TABLE_NAMES.PARTY)

class Party extends Model {}

module.exports = Party
