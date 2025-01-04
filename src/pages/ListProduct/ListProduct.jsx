import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import styles from './ListProduct.module.scss'; // Import module SCSS
import CategoryApi from '../../api/categories';
import { useCart } from '../../components/Contexts/CartContext';
import PriceFilter from './PriceFilter';
import productApi from '../../api/productApi';
import { Pagination } from 'react-bootstrap';

export default function ListProduct() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang

    // Hàm thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
        fetchProductsByCategory(id, currentPage);
    }, [id, currentPage]);

    // Hàm xử lý dữ liệu nhận từ PriceFilter
    const handlePriceChange = async (min, max, id, currentPage) => {

        if (min !== null && max !== null) {
            try {
                const response = await productApi.getProductByPrice(min, max, id, currentPage);
                setTotalPages(response.data.total_pages);
                setProducts(response.data.results); // Cập nhật danh sách sản phẩm theo giá
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        } else {
            fetchProductsByCategory(id, currentPage);
        }
    };


    const fetchProductsByCategory = async (categoryId, currentPage) => {
        try {
            const response = await CategoryApi.getById(categoryId, currentPage); // API lấy danh sách sản phẩm
            setTotalPages(response.data.total_pages);
            setProducts(response.data.results); // Cập nhật state sản phẩm

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
                <PriceFilter listPrice={listPrice} onPriceChange={handlePriceChange} category_id={id} currentPage={currentPage} />
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
                                            className={`card-img-top fixed-image ${styles.cardImgTop}`}
                                            alt={product.name}
                                            loading='lazy'
                                        />
                                        <div className={`card-body ${styles.cardBody}`}>
                                            <Link to={`/product/${product.product_id}`} className={`card-text ${styles.cardText} ${styles.title_ellipsis}`}>
                                                {product.name}
                                            </Link>
                                            <p className={`card-title ${styles.cardTitle}`}>
                                                {parseFloat(product.sell_price).toLocaleString()}đ
                                            </p>
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
            {/* Phân trang */}
            <Pagination className='mt-5'>
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
}
