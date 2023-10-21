import * as AuthService from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.js';

// REGISTER: redirigir a la pagina de login,
// en el login crear cookie y token

export const POSTRegisterUser = async (req, res) => {
  const userData = req.body;
  // 1. Crear nuevo usuario
  const newUser = await AuthService.registerNewUser(userData);
  if (newUser.error) return res.status(newUser.code).send(newUser);

  // 4. Envio la respuesta al front
  res.status(newUser.code).send(newUser);
};

export const POSTLoginUser = async (req, res) => {
  const userData = req.body;
  // 1. Logueo al usuario
  const currentUser = await AuthService.loginUser(userData);
  if (currentUser.error) return res.status(currentUser.code).send(currentUser);

  // 2. Creo y guardo el token en una cookie
  const token = generateToken({
    sub: currentUser.payload._id,
    user: { username: currentUser.payload.username },
  });

  res.cookie('accessToken', token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  // 3. Envio la respuesta al front
  res.status(currentUser.code).send(currentUser);
};

export const POSTLogoutUser = async (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).send({
    error: false,
    code: 200,
    message: 'Sesión cerrada correctamente',
    redirect: true,
    url: '/login',
  });
};
