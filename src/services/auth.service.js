import UserDao from '../dao/mongo/user.dao.js';
import CartDao from '../dao/mongo/cart.dao.js';
import { hashPassword, validatePassword } from '../utils/bcrypt.utils.js';

export const registerNewUser = async (userData) => {
  try {
    // 1. Verifico si el mail ya esta registrado
    const emailExist = await UserDao.findOne(userData.email);
    if (emailExist) throw new Error('Email ya registrado');
    // 2. Hasheo la contraseña
    userData.password = await hashPassword(userData.password);
    // 3. Creo el carrito para asignarlo al usuario
    const cart = await CartDao.create();
    // 4. Creo el usuario
    const newUser = await UserDao.create({ ...userData, cart: cart._id });

    return {
      error: false,
      code: 200,
      message: 'Usuario creado correctamente',
      payload: newUser,
      redirect: true,
      url: '/login',
    };
  } catch (error) {
    return {
      error: true,
      code: 401,
      message: `Error creando usuario: ${error}`,
      redirect: false,
    };
  }
};

export const loginUser = async (userData) => {
  try {
    const user = await UserDao.findOne(userData.email);
    const validPassword = await validatePassword(userData.password, user);
    if (!user || !validPassword) throw new Error('Credenciales incorrectas');

    return {
      error: false,
      code: 200,
      message: 'Usuario logueado correctamente',
      payload: user,
      redirect: true,
      url: '/products',
    };
  } catch (error) {
    return {
      error: true,
      code: 401,
      message: `Error logueando usuario: ${error}`,
      redirect: false,
    };
  }
};

export const logoutUser = () => {
  return {
    error: false,
    code: 200,
    message: 'Sesión cerrada correctamente',
    redirect: true,
    url: '/login',
  };
};
