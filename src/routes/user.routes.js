import { Router } from 'express';
import passport from 'passport';
import * as UserController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post(
  '/register',
  passport.authenticate('register'),
  async (req, res) => {
    res.status(200).json({
      user: req.user,
    });
  }
);

userRouter.post('/login', passport.authenticate('login'), async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

userRouter.get('/current', UserController.GETCurrent);
userRouter.get('/:uid', UserController.GETUserbyId);

export default userRouter;
