// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      email
    });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: 'Google credential missing'
      });
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

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.log('GOOGLE LOGIN ERROR:', error);

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin
};