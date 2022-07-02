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

const goalService = {
  create,
};

export default goalService;
