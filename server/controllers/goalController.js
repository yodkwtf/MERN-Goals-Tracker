const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

/**
 * @desc Get all goals
 * @route GET /api/goals
 * @access private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({ goals });
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

  const goal = await Goal.create({ text: req.body.text });
  res.status(201).json({ goal });
});

/**
 * @desc Update goal
 * @route PUT /api/goals/:id
 * @access private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id });
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  const updatedGoal = await Goal.findOneAndUpdate(
    { _id: req.params.id }, // query to find goal
    { text: req.body.text }, // update goal
    { new: true } // create if it doesn't exist
  );

  res.status(200).json({ updatedGoal });
});

/**
 * @desc Delete goal
 * @route DELETE /api/goals/:id
 * @access private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id });
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
