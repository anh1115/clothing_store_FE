import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

const CardRecommend = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]); // Mảng sản phẩm gợi ý
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Lấy userId và userToken từ localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo ? userInfo.user_id : null;
  const userToken = userInfo ? userInfo.token : null; // Lấy token từ localStorage

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      if (!userId || !userToken) {
        setError('Không tìm thấy thông tin người dùng hoặc token');
        setLoading(false);
        return;
      }
  
      try {
        // Gọi API để lấy danh sách sản phẩm gợi ý
        const response = await fetch(`http://127.0.0.1:8000/api/recommend/${userId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${userToken}`
          },
        });
  
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu sản phẩm gợi ý.');
        }
  
        const data = await response.json();
        const productIds = data.recommended_products;
  
        // Lấy thông tin chi tiết cho từng sản phẩm
        const productDetailsPromises = productIds.map((id) =>
          fetch(`http://127.0.0.1:8000/api/product/${id}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${userToken}`, // Truyền token xác thực
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Lỗi khi lấy sản phẩm ${id}: ${res.status}`);
              }
              return res.json(); // Trả về dữ liệu JSON nếu trạng thái HTTP OK
            })
            .catch((err) => {
              console.error(`Lỗi khi lấy thông tin sản phẩm ${id}:`, err);
              return null; // Trả về `null` nếu có lỗi
            })
        );
  
        const products = await Promise.all(productDetailsPromises);
  
        // Lọc các sản phẩm hợp lệ (tránh trường hợp null hoặc undefined)
        const validProducts = products.filter((product) => product && product.product_id);
        setRecommendedProducts(validProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecommendedProducts();
  }, [userId, userToken]);
  

  if (loading) return <div>Đang tải...</div>;

  return (
    <Row xs={2} md={4} className="g-4 my-3">
      {recommendedProducts.length > 0 ? (
        recommendedProducts.map((product) => (
          <Col key={product.product_id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.images && product.images.length > 0 ? 'http://127.0.0.1:8000' + product.images[0].url : ''}
                alt={product.name}
                className="fixed-image"
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>
                  <Link to={`/product/${product.product_id}`} className={styles.title_ellipsis}>
                    {product.name || 'Tên sản phẩm'}
                  </Link>
                </Card.Title>
                <Card.Text>
                  <span className="text-danger fw-bold">
                    {parseFloat(product.sell_price).toLocaleString()}đ
                  </span>
                </Card.Text>
                <Link to={`/product/${product.product_id}`}>
                  <Button className={styles.addCard}>Xem chi tiết</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <div>Không có sản phẩm gợi ý.</div>
      )}
    </Row>
  );
};

export default CardRecommend;
