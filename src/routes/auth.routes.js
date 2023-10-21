import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/register', AuthController.POSTRegisterUser);

authRouter.post('/login', AuthController.POSTLoginUser);

authRouter.post('/logout', AuthController.POSTLogoutUser);

export default authRouter;
