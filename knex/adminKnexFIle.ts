import path from 'path'

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', 'src', 'database', 'admin_enc19_database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'src', 'database', 'migrations', 'admin' )
  },
  useNullAsDefault: true
}