const knex = require('knex');
require("dotenv").config();
const {PGSTRINGURI} = process.env;
const db = knex({
  client: 'pg',
  connection: {
    connectionString: PGSTRINGURI,
    ssl: {rejectUnauthorized:false}
  },
});

async function test() {
    const data = await db.raw("select version()");
    console.log(data.rows);
    
}
//test();
module.exports = {
    db,
}