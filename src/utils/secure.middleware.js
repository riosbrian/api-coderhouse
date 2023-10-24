import { getUserById } from "../services/user.service.js";
import cookieExtractor from "./cookieExtractorJwt.js";
import { verifyToken } from "./jwt.js";

const hasCredentials = (token) => {
  let validToken = null;
  if (token) validToken = verifyToken(token);
  if (token && validToken) return true;
  return false;
};

export const isLogged = (req, res, next) => {
  const token = cookieExtractor(req);
  if (hasCredentials(token)) return next();
  res.redirect("/products");
};

export const notLogged = (req, res, next) => {
  const token = cookieExtractor(req);
  if (hasCredentials(token)) return next();
  res.redirect("/login");
};

export const inyectUser = async (req, res, next) => {
  const token = cookieExtractor(req);

  if (!hasCredentials(token))
    return res.status(400).send({
      code: 400,
      error: true,
      message: `Ningún usuario logueado`,
    });

  const currentUser = await getUserById(validToken.sub);
  if (currentUser.error) return res.status(currentUser.code).send(currentUser);
  req.user = currentUser.user;
  next();
};
