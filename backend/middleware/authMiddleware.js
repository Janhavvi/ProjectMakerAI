// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { sendError } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {

    try {

      token =
        req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(
        decoded.id
      ).select('-password');

      next();

    } catch (error) {

      return sendError(res, 'Not authorized', 401);
    }

  }

  if (!token) {

    return sendError(res, 'No token provided', 401);
  }
};

module.exports = {
  protect
};
