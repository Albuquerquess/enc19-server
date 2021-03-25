import path from 'path'
console.log(path.resolve(__dirname, 'src', 'database', 'rehab_database.sqlite'))
export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'rehab_database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations' )
  },
  useNullAsDefault: true
}