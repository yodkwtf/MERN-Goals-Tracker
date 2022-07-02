const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/**
 * @desc    Register New User
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide a name, email and password');
  }

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Sending response
  if (newUser) {
    res.status(201).json({
      success: true,
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400);
    throw new Error('User could not be created');
  }
});

/**
 * @desc    Login User
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  // find user by email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success: true,
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  res.json({ msg: 'Login user' });
});

/**
 * @desc    Get User Data
 * @route   GET /api/users/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  // get user data
  const { _id, name, email } = req.user;

  // send response (we can also directly send `req.user` as a response)
  res.status(200).json({
    success: true,
    id: _id,
    name,
    email,
  });
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = { registerUser, loginUser, getMe };
