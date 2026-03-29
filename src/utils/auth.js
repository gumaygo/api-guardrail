const jwt = require('jsonwebtoken');
require('dotenv').config({ quiet: true });

const SECRET = process.env.JWT_SECRET || 'dev_secret';

const generateToken = (payload = { sub: 'user_123', role: 'admin' }) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, verifyToken };
