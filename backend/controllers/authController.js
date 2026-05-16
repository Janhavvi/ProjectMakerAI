// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const buildAuthPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  subscription: user.subscription,
  token: generateToken(user._id)
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Name, email, and password are required', 400);
    }

    if (password.length < 6) {
      return sendError(res, 'Password must be at least 6 characters', 400);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return sendError(res, 'User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return sendSuccess(res, 'Account created', buildAuthPayload(user), 201);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401);
    }

    return sendSuccess(res, 'Login successful', buildAuthPayload(user));
  } catch (error) {
    return sendError(res, error.message);
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return sendError(res, 'Google credential missing', 400);
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({
      email: payload.email
    });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        password: 'google-login'
      });
    }

    return sendSuccess(res, 'Google login successful', buildAuthPayload(user));
  } catch (error) {
    console.log('GOOGLE LOGIN ERROR:', error);
    return sendError(res, error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return sendError(res, 'Email is required', 400);
    }

    return sendSuccess(res, 'If that account exists, a secure reset link will be sent.');
  } catch (error) {
    return sendError(res, error.message);
  }
};

const githubLogin = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return sendError(res, 'GitHub email missing', 400);
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: 'github-login'
      });
    }

    return sendSuccess(res, 'GitHub login successful', buildAuthPayload(user));
  } catch (error) {
    return sendError(res, error.message);
  }
};

const getMe = async (req, res) => {
  return sendSuccess(res, 'Profile loaded', {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    subscription: req.user.subscription
  });
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  githubLogin,
  getMe
};
