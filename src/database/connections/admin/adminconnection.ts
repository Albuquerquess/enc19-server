import knex from 'knex'
import path from 'path'

const adminConnection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', '..', 'admin_enc19_database.sqlite')
  },
  useNullAsDefault: true
})

export default adminConnection
