import axios from 'axios';

const postData = async (endpoint, newData, createdData) => {
    try {
        const response = await axios.post(`/admin/${endpoint}/create`, newData);
        createdData(response.data);
    } catch (error) {
        console.error(`Error posting ${endpoint}:`, error);
    }
};

export default postData;
