const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  // Check for JWT Bearer token (Swagger)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.SESSION_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }

  // Fall back to session (browser)
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'Not authenticated',
  });
};

module.exports = { isAuthenticated };