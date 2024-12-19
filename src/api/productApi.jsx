import apiClient from './index';

const productApi = {
    getProductNew: () => apiClient.get('products/new'),
    getAll: () => apiClient.get('/products'),
    getById: (id) => apiClient.get(`/product/${id}`),
    getProductByName: (keyWord) => apiClient.get(`products/search?q=${keyWord}`),
    getBanner: () => apiClient.get('/banners'),
    getProductByPrice: (minPrice, maxPrice, categoryId, currentPage) => apiClient.get(`products/filter-by-price?min_price=${minPrice}&max_price=${maxPrice}&category_id=${categoryId}&page=${currentPage}`),
    getRelatedProducts: (id) => apiClient.get(`/related_products/${id}`),
};

export default productApi;