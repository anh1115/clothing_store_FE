import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

export default function CardProduct() {
  const products = [
    {
      id: 1,
      title: 'Quần dài ống suông',
      price: 299000,
      oldPrice: 399000,
      imgSrc: '/den-hnqda025-5-20221226110916-0a.webp',
    },
    {
      id: 2,
      title: 'Quần tây ống suông',
      price: 259000,
      oldPrice: 359000,
      imgSrc: '/den-hnqda025-5-20221226110916-0a.webp',
    },
    {
      id: 3,
      title: 'Chân váy lửng form A phối vải voan',
      price: 199000,
      oldPrice: 299000,
      imgSrc: '/den-hnqda025-5-20221226110916-0a.webp',
    },
    {
      id: 4,
      title: 'Đầm ôm nini cổ vuông tay xòe',
      price: 149000,
      oldPrice: 249000,
      imgSrc: '/den-hnqda025-5-20221226110916-0a.webp',
    },
  ];

  const handleAddToCart = (productId) => {
    alert(`Thêm sản phẩm ID: ${productId} vào giỏ hàng!`);
  };

  return (
    <Row xs={2} md={4} className="g-4 my-3">
      {products.map((product) => (
        <Col key={product.id}>
          <Card className="h-100">
            <Card.Img variant="top" src={product.imgSrc} alt={product.title} loading='lazy' />
            <Card.Body>
              <Card.Title>
                <Link to={'/'}>{product.title}</Link>
              </Card.Title>
              <Card.Text>
                <span className="text-danger fw-bold">{product.price.toLocaleString()}đ</span>
                <span className="text-muted text-decoration-line-through ms-2">
                  {product.oldPrice.toLocaleString()}đ
                </span>
              </Card.Text>
              <Button
                className={styles.addCard}
                onClick={() => handleAddToCart(product.id)}
              >
                Thêm vào giỏ
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
