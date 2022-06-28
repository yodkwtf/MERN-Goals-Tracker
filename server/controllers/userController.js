const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * @desc    Register New User
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  res.json({ msg: 'Registering user' });
});

/**
 * @desc    Login User
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  res.json({ msg: 'Login user' });
});

/**
 * @desc    Get User Data
 * @route   GET /api/users/me
 * @access  Public
 */
const getMe = asyncHandler(async (req, res) => {
  res.json({ msg: 'User data' });
});

module.exports = { registerUser, loginUser, getMe };
