const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken'); // <-- 1. ADD THIS LINE

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/failure',
    session: false // <-- 2. ADD THIS LINE
  }),
  (req, res) => {
    // <-- 3. REPLACE res.status... WITH THIS:
    const token = jwt.sign(
      { id: req.user.id, username: req.user.username },
      process.env.SESSION_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Authentication successful',
      token: token, // <-- this is your eyJ... token!
      user: req.user,
    });
  },
);

router.get('/me', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Not authenticated',
    });
  }

  res.status(200).json(req.user);
});

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return next(sessionErr);
      }

      res.status(200).json({
        message: 'Logged out successfully',
      });
    });
  });
};

router.get('/logout', logout);
router.post('/logout', logout);

router.get('/failure', (req, res) => {
  res.status(401).json({
    message: 'Authentication failed',
  });
});

module.exports = router;