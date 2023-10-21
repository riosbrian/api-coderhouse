import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const SECRET = config.JWT_SECRET;

export const generateToken = (userData) => {
  return jwt.sign(userData, SECRET, { expiresIn: '1hr' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
