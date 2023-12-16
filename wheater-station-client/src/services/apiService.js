import axios from 'axios';

// const apiService = {
//     get(endpoint, params = {}) {
//         return axios.get(endpoint, { params });
//     },
//     post(endpoint, data = {}) {
//         return axios.post(endpoint, data);
//     },
//     put(endpoint, data = {}) {
//         return axios.put(endpoint, data);
//     },
//     delete(endpoint) {
//         return axios.delete(endpoint);
//     },
// };

const apiClient = axios.create({
    baseURL: 'https://7dlfcbtk-3000.use2.devtunnels.ms/readData',
    headers: {
        'Content-Type': 'application/json'
    }
});


export default apiClient;