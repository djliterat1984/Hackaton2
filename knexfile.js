require('dotenv').config();
const {PGSTRINGURI} = process.env;

module.exports = {
    client: 'pg', 
    connection: {
        connectionString: PGSTRINGURI,
        ssl: {rejectUnauthorized:false}
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  };  