const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

// one way
router.route('/').get(getGoals).post(setGoal);

// another way
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
