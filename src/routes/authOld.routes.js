import { Router } from 'express';
import passport from 'passport';
import * as AuthController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post(
  '/register',
  passport.authenticate('register', { session: false }),
  AuthController.POSTRegister
);

export default authRouter;
