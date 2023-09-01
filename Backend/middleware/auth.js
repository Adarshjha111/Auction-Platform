const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Attach the user object to the request
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
