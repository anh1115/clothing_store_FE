import apiClient from './index';

const CategoryApi = {
    getAll: () => apiClient.get('/categories'),
    getById: (id) => apiClient.get(`products/by-category/${id}`),
};

export default CategoryApi;