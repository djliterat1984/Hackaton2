exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('username').notNullable().unique(); // Unique username
      table.string('email').notNullable().unique(); // Unique email
      table.string('role').notNullable().defaultTo('user'); // Default role is 'user'
      table.timestamps(true, true); // Created at and updated at timestamps
    })
    .createTable('hashedpwd', function(table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE'); // Foreign key to users table
      table.string('password_hash').notNullable(); // Store the hashed password
      table.timestamps(true, true); // Created at and updated at timestamps
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('hashedpwd')
    .dropTableIfExists('users');
};
