import axios from 'axios';

const BASE_URL = 'https://7dlfcbtk-3000.use2.devtunnels.ms';

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

