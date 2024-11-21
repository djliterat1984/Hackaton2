const {db} =require("../config/db.js");
const bcrypt = require("bcrypt");

const checkLogin = async (username, password) => {
    try {
      // Step 1: Retrieve the user based on the username from the 'users' table
      const [user] = await db('users').where({ username }).select('id', 'username', 'role');
  
      if (!user) {
        // If the user doesn't exist, return an error
        throw new Error('User not found');
      }
  
      // Step 2: Retrieve the hashed password from the 'hashpwd' table based on user id
      const [hashedRecord] = await db('hashedpwd').where({ user_id: user.id }).select('password_hash');
  
      if (!hashedRecord) {
        // If no password hash record is found, something went wrong
        throw new Error('Password record not found');
      }
  
      // Step 3: Compare the provided password with the stored hashed password
      const isPasswordCorrect = await bcrypt.compare(password, hashedRecord.password_hash);
  
      if (!isPasswordCorrect) {
        // If the password doesn't match, return an error
        throw new Error('Incorrect password');
      }
  
      // If all checks pass, return the user (you could return more info if needed)
      return { message: 'Login successful', user };
    } catch (error) {
      // Handle errors, this could be logging or sending an appropriate response
      throw error; // You could customize the error handling further
    }
  };

  module.exports = {
    checkLogin,
  }