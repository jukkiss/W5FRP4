
const express = require('express');
const requireAuth = require('../middlewares/authMiddleware');

const router = express.Router();

// Define a protected route
router.get('/api/protectedroute', requireAuth, (req, res) => {
  // Example functionality: return a message
  res.json({ message: 'Welcome to the protected route, you are authenticated!' });
});

module.exports = router;
