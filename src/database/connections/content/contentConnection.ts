import knex from 'knex';
import path from 'path';

const contentConnection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '..', '..', 'content_enc19_database.sqlite')
  },
  useNullAsDefault: true,
});

export default contentConnection;