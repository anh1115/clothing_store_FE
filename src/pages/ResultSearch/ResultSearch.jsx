import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import styles from './ResultSearch.module.scss';
import { Pagination } from 'react-bootstrap';
export default function ResultSearch() {
  const [result, setResult] = useState([]);
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  
  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchProducts = async (keyword, currentPage) => {
      try {
        const response = await productApi.getProductByName(keyword, currentPage); // API lấy danh sách sản phẩm
        setTotalPages (response.data.total_pages);
        setResult(response.data.results); // Cập nhật state sản phẩm
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProducts(keyword, currentPage);
  }, [keyword, currentPage]);

  return (
    <div className='container mt-5'>
      <h3>Kết quả cho từ khóa: "{keyword}"</h3>
      <div className="row row-cols-1 row-cols-md-5 g-4 mt-2">
        {result.map((product) => (
          <div className="col" key={product.id}>
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
  )
}
