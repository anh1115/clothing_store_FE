import React, { useEffect, useState } from 'react'
import ProductSlider from '../ProductSlider/ProductSlider'
import productApi from '../../api/productApi';

export default function ProductNew() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await productApi.getProductNew(); // Gọi API
            setProducts(response.data); // Cập nhật state với dữ liệu từ API
        } catch (error) {
            console.error('Error fetching products new:', error);
        }
    };

    fetchProducts(); // Thực hiện gọi hàm khi component được render
}, []);

  return (
    <div>
        <h2>Sản phẩm mới</h2>
        <ProductSlider products={products}/>
    </div>
  )
}
