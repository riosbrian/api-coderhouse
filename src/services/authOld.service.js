import { generateToken } from '../utils/jwt.js';

export const createToken = (user) => {
  return generateToken({
    sub: user._id,
    user: { username: user.username },
  });
};
