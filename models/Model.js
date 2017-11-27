const db = require('../db')

module.exports = (tableName) => {
  class Model {
    static all () {
      return db(tableName).then(res => {
        res.forEach(resource => {
          if (resource.hasOwnProperty('password')) delete res.password
        })
        return res
      })
    }

    static find (id) {
      return db(tableName).where({ id }).first().then(([res]) => {
        if (res.hasOwnProperty('password')) delete res.password
        return res
      })
    }

    static create (body) {
      return db(tableName).insert(body).returning('*').then(([res]) => {
        if (res.hasOwnProperty('password')) delete res.password
        return res
      })
    }

    static update (id, body) {
      return db(tableName).update(body).where({ id }).returning('*').then(([res]) => {
        if (res.hasOwnProperty('password')) delete res.password
        return res
      })
    }

    static destroy (id) {
      return db(tableName).del().where({ id }).returning('*').then(([res]) => {
        if (res.hasOwnProperty('password')) delete res.password
        return res
      })
    }
  }

  return Model
}
