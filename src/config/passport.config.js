import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { createCart } from '../services/cart.service.js';
import * as UserService from '../services/user.service.js';
import config from './config.js';
import cookieExtractor from '../utils/cookieExtractorJwt.js';

const JWTStrategy = jwt.Strategy;

const initLocalStrategy = () => {
  // LOCAL CON SESSION
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
            cart: cart._id,
          });
          /* if (newUser.code == 400) return done(newUser.message); */
          if (newUser.code == 400) return done(null, { error: true });
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
          return done(null, user);
        } catch (error) {
          return done(`Error login user ${error}`);
        }
      }
    )
  );

  // JSON WEB TOKEN
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.JWT_SECRET,
      },
      async (payload, done) => {
        const user = await UserService.getUserById(payload.sub);
        console.log('cl passport', user);
        if (user.code == 400) return done('Credenciales no válidas');
        return done(null, user.user);
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
