import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

export default function CardProduct() {
  const DEFAULT_TOKEN = import.meta.env.VITE_API_DEFAULT_TOKEN || '410e1ef3e03468e1d2fb6df16d961b2f7431a836';
  const [products, setData] = useState({ top_sales: [] }); // Khởi tạo mảng rỗng an toàn
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/top-sales-realtime', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${DEFAULT_TOKEN}`, // Thêm token vào header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch top sales data:', error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading dù có lỗi hay không
      }
    };

    fetchTopSales();
  }, []);

  const handleAddToCart = (productId) => {
    alert(`Thêm sản phẩm ID: ${productId} vào giỏ hàng!`);
  };

  return (
    <Row xs={2} md={4} className="g-4 my-3">
      {loading ? (
        <div>Loading...</div> // Hiển thị trạng thái loading
      ) : products.top_sales.length > 0 ? (
        products.top_sales.map((product) => (
          <Col key={product.product_id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.image_url && product.image_url.length > 0 ? 'http://127.0.0.1:8000/media/' + product.image_url : ''} // Xử lý hình ảnh nếu bị thiếu
                alt={product.name}
                className='fixed-image'
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>
                  <Link to={`/product/${product.product_id}`} className={styles.title_ellipsis}>{product.name || 'Tên sản phẩm'}</Link>
                </Card.Title>
                <Card.Text>
                  <span className="text-danger fw-bold">
                    {product.sell_price ? product.sell_price.toLocaleString() : '0'}đ
                  </span>
                </Card.Text>
                <Link to={`/product/${product.product_id}`}>
                  <Button
                    className={styles.addCard}
                  >
                    Xem chi tiết
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <div>Không có sản phẩm nào.</div> // Xử lý khi không có dữ liệu
      )}
    </Row>
  );
}
