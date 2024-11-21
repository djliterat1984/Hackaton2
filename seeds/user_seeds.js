const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Clear the existing data in the tables before seeding
  await knex('hashedpwd').del();
  await knex('users').del();

  // Create an array of user objects with username, email, password, and role
  const users = [
    { username: 'admin', email: 'john@example.com', password: 'password123', role: 'admin' },
    { username: 'editor', email: 'jane@example.com', password: 'securepass456', role: 'editor' },
    { username: 'user', email: 'alice@example.com', password: 'mySecret789', role: 'user' },
  ];

  // Loop over the users and hash the passwords using bcrypt
  for (let user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password with a salt rounds of 10

    // Insert the user into the 'users' table and get the user id
    const insertedUser = await knex('users').insert({
      username: user.username,
      email: user.email,
      role: user.role, // Add the role to the user
    }).returning('*'); // Return the entire user object (including the id)

    // Extract the user_id from the inserted user object
    const userId = insertedUser[0].id;

    // Insert the hashed password into the 'hashedpwd' table
    await knex('hashedpwd').insert({
      user_id: userId, // Foreign key to the users table
      password_hash: hashedPassword
    });
  }
};
