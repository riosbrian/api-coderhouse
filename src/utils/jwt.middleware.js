import passport from 'passport';

// error, usuario y que sucedio
const handleError = (strategy) => async (req, res, next) => {
  passport.authenticate(strategy, { session: false }, (err, user, info) => {
    if (err) next(err);
    if (!user) {
      /* return res.status(401).json({
        status: 'error',
        message: info.message ? info.message : info.toString(),
      }); */
      req.user = null;
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default handleError;
