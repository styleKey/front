import axios from 'axios';

const getData = async (endpoint) => {
  try {
    const response = await axios.get(`/user/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting ${endpoint}:`, error);
  }
};

export default getData;
