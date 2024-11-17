require('dotenv').config();
const {PGSTRINGURI,PGPASSWORD, PGPORT} = process.env;

module.exports = {
    client: 'pg', 
    connection: {
      connectionString: PGSTRINGURI,
      // password: PGPASSWORD,
      port: PGPORT,
      ssl: {rejectUnauthorized:false}
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  };  