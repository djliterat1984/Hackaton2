const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Secret key for signing the JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware to verify JWT token and check user role
const verifyToken = (req, res, next) => {
  // Get token from Authorization header (typically sent as 'Bearer <token>')
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token using jwt.verify
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    
    // Attach user info to the request object for further use in routes
    req.user = decoded;

    // If you need to check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Call the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};


const generateToken = (userId, role) => {
  // Sign the token with user info (id and role) and a secret key
  return jwt.sign({ id: userId, role: role }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports = {
  verifyToken,
  generateToken
};
