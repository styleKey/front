import axios from 'axios';

const deleteData = async (endpoint, id) => {
    try {
        await axios.delete(`/admin/${endpoint}/${id}`);
    } catch (error) {
        console.error(`Error deleting ${endpoint}:`, error);
    }
};

export default deleteData;
