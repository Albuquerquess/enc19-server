import path from 'path'

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', 'src', 'database', 'users_enc19_database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'src', 'database', 'migrations', 'users' )
  },
  useNullAsDefault: true
}