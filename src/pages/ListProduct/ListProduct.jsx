import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import styles from './ListProduct.module.scss'; // Import module SCSS
import CategoryApi from '../../api/categories';
import { useCart } from '../../components/Contexts/CartContext';
import PriceFilter from './PriceFilter';
import productApi from '../../api/productApi';

export default function ListProduct() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    const listPrice = [
        {
            id: 1,
            minPrice: 0,
            maxPrice: 200000
        },
        {
            id: 2,
            minPrice: 200000,
            maxPrice: 400000
        },
        {
            id: 3,
            minPrice: 400000,
            maxPrice: 600000
        },
        {
            id: 4,
            minPrice: 600000,
            maxPrice: 800000
        },
        {
            id: 5,
            minPrice: 800000,
            maxPrice: 1000000
        },
        {
            id: 6,
            minPrice: 1000000,
            maxPrice: 10000000
        },
    ]

    useEffect(() => {
        fetchProductsByCategory(id);
    }, [id]);

    // Hàm xử lý dữ liệu nhận từ PriceFilter
    const handlePriceChange = async (min, max, id) => {
        
        if (min !== null && max !== null) {
            try {
                const response = await productApi.getProductByPrice(min, max, id);
                setProducts(response.data); // Cập nhật danh sách sản phẩm theo giá
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        } else {
            fetchProductsByCategory(id);
        }
    };

    const fetchProductsByCategory = async (categoryId) => {
        try {
            const response = await CategoryApi.getById(categoryId); // API lấy danh sách sản phẩm
            setProducts(response.data); // Cập nhật state sản phẩm
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };

    return (
        <div className={`container mt-5 ${styles.container}`}>
            <Helmet>
                <title>Danh sách - {appName}</title> {/* Set title với tên sản phẩm */}
            </Helmet>

            <div>
                <PriceFilter listPrice={listPrice} onPriceChange={handlePriceChange} category_id={id} />
                {/* Kiểm tra nếu không có sản phẩm */}
                {products.length === 0 ? (
                    <div className="text-center">
                        <h3 className='fw-bold'>Hiện không tìm thấy Sản Phẩm</h3>
                    </div>
                ) : (
                    <>
                        {/* <PriceFilter listPrice={listPrice} onPriceChange={handlePriceChange} /> */}
                        <div className="row row-cols-1 row-cols-md-5 g-4">
                            {products.map((product) => (
                                <div className="col" key={product.product_id}>
                                    <div className={`card h-100 ${styles.card}`}>
                                        <img
                                            src={product.images && product.images.length > 0 ? 'http://127.0.0.1:8000' + product.images[0].url : ''}
                                            className={`card-img-top ${styles.cardImgTop}`}
                                            alt={product.name}
                                            loading='lazy'
                                        />
                                        <div className={`card-body ${styles.cardBody}`}>
                                            <p className={`card-title ${styles.cardTitle}`}>
                                                {parseFloat(product.sell_price).toLocaleString()}đ
                                            </p>
                                            <Link to={`/product/${product.product_id}`} className={`card-text ${styles.cardText}`}>
                                                {product.name}
                                            </Link>
                                        </div>
                                        <div className={`card-footer ${styles.cardFooter}`}>
                                            <Link to={`/product/${product.product_id}`}>
                                                <button className={styles.addToCart}>Xem chi tiết</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
