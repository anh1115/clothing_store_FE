import apiClient from './index';

const getToken = {
    getToken: () => apiClient.get('/api-token-auth'),
};

export default getToken;