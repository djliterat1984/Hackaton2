const knex = require( 'knex' );
const { client, connection, migrations, seeds } = require('../knexfile.js');

const blogApiDb = knex( {
	client: client,
	connection: {
		connectionString: connection.connectionString,
		// host: PGHOST,
		port: PGPORT,
		// user: PGUSER,
		// password: PGPASSWORD,
		// database: PGDATABASE,
		ssl: { rejectUnauthorized: false }
	},
	migrations,
	seeds
} );

module.exports = {
	blogApiDb,
}