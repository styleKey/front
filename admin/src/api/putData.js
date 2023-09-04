import axios from 'axios';

const putData = async (endpoint, id, newData, updatedData) => {
    try {
        const response = await axios.put(`/admin/${endpoint}/${id}`, newData);
        updatedData(response.data);
    } catch (error) {
        console.error(`Error updating ${endpoint}:`, error);
    }
};

export default putData;

