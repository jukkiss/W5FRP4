const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
  // Get token from the Authorization header
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
  const token = authorization.split(' ')[1];

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add decoded user data to request object
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = requireAuth;
