import apiClient from './index';

const productApi = {
    getProductNew: () => apiClient.get('products/new'),
    getAll: () => apiClient.get('/products'),
    getById: (id) => apiClient.get(`/product/${id}`),
    getProductByName: (keyWord, currentPage) => apiClient.get(`products/search?q=${keyWord}&page=${currentPage}`),
    getBanner: () => apiClient.get('/banners'),
    getProductByPrice: (minPrice, maxPrice, categoryId, currentPage) => apiClient.get(`products/filter-by-price?min_price=${minPrice}&max_price=${maxPrice}&category_id=${categoryId}&page=${currentPage}`),


    // Phương thức gửi yêu cầu POST để lấy URL thanh toán
    getURLVNPay: (order_type, order_id, amount, order_desc) => apiClient.post('/create_payment/', {
        order_type,
        order_id,
        amount,
        order_desc
    }),

    getRelatedProducts: (id) => apiClient.get(`/related_products/${id}`),
};

export default productApi;