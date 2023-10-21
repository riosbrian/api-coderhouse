import cookieExtractor from './cookieExtractorJwt.js';
import { verifyToken } from './jwt.js';

export const isLogged = (req, res, next) => {
  let validToken = null;
  const token = cookieExtractor(req);
  if (token) validToken = verifyToken(token);
  if (token && validToken) return res.redirect('/products');
  next();
};

export const notLogged = (req, res, next) => {
  let validToken = null;
  const token = cookieExtractor(req);
  if (token) validToken = verifyToken(token);
  if (!token && !validToken) return res.redirect('/login');
  next();
};

export const inyectUser = (req, res, next) => {
  let validToken = null;
  const token = cookieExtractor(req);
  if (token) validToken = verifyToken(token);
  if (!token && !validToken) return next();
  req.userID = validToken.sub;
  next();
};
