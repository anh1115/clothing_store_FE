import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import styles from './ResultSearch.module.scss';

export default function ResultSearch() {
  const [result, setResult] = useState([]);
  const { keyword } = useParams();

  useEffect(() => {
    const fetchProducts = async (keyword) => {
      try {
        const response = await productApi.getProductByName(keyword); // API lấy danh sách sản phẩm
        setResult(response.data); // Cập nhật state sản phẩm
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProducts(keyword);
  }, [keyword]);

  return (
    <div className='container mt-5'>
      <h3>Kết quả cho từ khóa: "{keyword}"</h3>
      <div className="row row-cols-1 row-cols-md-5 g-4 mt-2">
        {result.map((product) => (
          <div className="col" key={product.id}>
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
    </div>
  )
}
