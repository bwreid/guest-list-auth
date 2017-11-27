const bcrypt = require('bcryptjs')
const table = 'users'
exports.seed = knex => {
  return knex(table).del().then(() => {
    return knex(table).insert([
      { id: 1, email: 'user@gmail.com', password: bcrypt.hashSync('password'), role: 'user' },
      { id: 2, email: 'vip@gmail.com', password: bcrypt.hashSync('password'), role: 'vip' },
      { id: 3, email: 'admin@gmail.com', password: bcrypt.hashSync('password'), role: 'admin' }
    ])
  }).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  })
}
