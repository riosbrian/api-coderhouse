import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { inyectUser } from '../utils/secure.middleware.js';

const userRouter = Router();

userRouter
  .get('/current', inyectUser, UserController.GETCurrent)
  .get('/:uid', UserController.GETUserByID);

export default userRouter;
