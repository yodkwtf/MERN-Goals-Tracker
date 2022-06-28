const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header is set
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token and put in req.user
      req.user = await User.findById(decoded.id).select('-password'); // decoded object has id of the user hidden

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized to access this resource');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

module.exports = { auth };
