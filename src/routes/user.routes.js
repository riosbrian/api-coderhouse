import { Router } from 'express';
import { isLogged, notLogged } from '../utils/secure.middleware.js';

const userRouter = Router();

userRouter.get('/register', (req, res) => {
  res.render('register');
});

userRouter.get('/login', isLogged, (req, res) => {
  res.render('login');
});

userRouter.get('/products', notLogged);

userRouter.get('/current', notLogged, (req, res) => {});

export default userRouter;
