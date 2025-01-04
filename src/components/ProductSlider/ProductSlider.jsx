import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSlider.module.scss';
import { useEffect } from 'react';

export default function ProductSlider({ products }) {
    const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Swiper
            className='my-3'
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
            }}
        >
            {products.map((product) => (
                <SwiperSlide key={product.product_id}>
                    <Card className={`h-100 ${styles['product-card']}`}>
                        <Card.Img
                            variant="top"
                            src={product.images && product.images.length > 0 ? 'http://127.0.0.1:8000' + product.images[0].url : ''}
                            alt={product.name}
                            loading='lazy'
                            className='fixed-image'
                        />
                        <Card.Body>
                            <Card.Title>
                                <Link to={`/product/${product.product_id}`} className={styles['product-card-title']}>{product.name}</Link>
                            </Card.Title>
                            <Card.Text>
                                <span className="text-danger fw-bold">
                                    {parseFloat(product.sell_price).toLocaleString()}đ
                                </span>
                                {/* <span className="text-muted text-decoration-line-through ms-2">
                                    {product.sell_price.toLocaleString()}đ
                                </span> */}
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
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
