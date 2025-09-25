import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllGoals = async () => {
  try {
    const response = await api.get('/api/goals/');
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoal = async (goalData) => {
  try {
    const response = await api.post('/api/goals/', goalData);
    return response.data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoal = async (goalId, goalData) => {
  try {
    const response = await api.put(`/api/goals/${goalId}`, goalData);
    return response.data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const deleteGoal = async (goalId) => {
  try {
    await api.delete(`/api/goals/${goalId}`);
    return true;
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

export const getDashboardData = async () => {
  try {
    const response = await api.get('/api/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export default api;
