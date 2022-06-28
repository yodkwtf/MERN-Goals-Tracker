const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');
const { auth } = require('../middleware/authMiddleware');

// one way
router.route('/').get(auth, getGoals).post(auth, setGoal);

// another way
router.put('/:id', auth, updateGoal);
router.delete('/:id', auth, deleteGoal);

module.exports = router;
