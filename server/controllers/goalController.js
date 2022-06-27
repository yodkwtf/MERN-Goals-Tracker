const asyncHandler = require('express-async-handler');

/**
 * @desc Get all goals
 * @route GET /api/goals
 * @access private
 */
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: 'Get Goals' });
});

/**
 * @desc Set goals
 * @route POST /api/goals
 * @access private
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('No text provided');
  }
  res.status(201).json({ msg: 'Create Goal' });
});

/**
 * @desc Update goal
 * @route PUT /api/goals/:id
 * @access private
 */
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Update Goal with ID ${req.params.id}` });
});

/**
 * @desc Delete goal
 * @route DELETE /api/goals/:id
 * @access private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Delete Goal with ID ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
