import apiClient from './index';

const cartApi = {
    addItem: (item) => apiClient.post('/cart', item),
    getCart: () => apiClient.get('/cart'),
};

export default cartApi;