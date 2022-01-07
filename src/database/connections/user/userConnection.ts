import knex from 'knex';
import path from 'path';

const userConnection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', '..', 'users_enc19_database.sqlite')
  },
  useNullAsDefault: true,
});

export default userConnection;