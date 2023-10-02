import passport from 'passport';
import local from 'passport-local';
import { createCart } from '../services/cart.service.js';
import * as UserService from '../services/user.service.js';

const initLocalStrategy = () => {
  passport.use(
    'register',
    new local.Strategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        const { name, lastname, username, age } = req.body;
        try {
          const cart = await createCart();
          const newUser = await UserService.createNewUser({
            name,
            lastname,
            username,
            email,
            age,
            password,
            cart,
          });
          return done(null, newUser.payload);
        } catch (error) {
          return done(`Error creating new user ${error}`);
        }
      }
    )
  );

  passport.use(
    'login',
    new local.Strategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        if (req.user) return done('Usuario ya autenticado');
        try {
          const user = await UserService.loginUser(email, password);
          console.log(user);
          return done(null, user);
        } catch (error) {
          return done(`Error login user ${error}`);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { user } = await UserService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(null, false);
    }
  });
};

export default initLocalStrategy;
