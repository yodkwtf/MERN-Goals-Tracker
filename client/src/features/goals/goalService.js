import axios from 'axios';

const API_URL = '/api/goals';

// Create new goal
const create = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goal, config);
  return response.data;
};

// Get all goals
const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${goalId}`, config);
  return response.data;
};

const goalService = {
  create,
  getAll,
  delete: deleteGoal,
};

export default goalService;
