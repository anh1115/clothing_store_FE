import apiClient from './index';

const CategoryApi = {
    getAll: () => apiClient.get('/categories'),
    getById: (id, currentPage) => apiClient.get(`products/by-category/${id}/?page=${currentPage}`),
};

export default CategoryApi;