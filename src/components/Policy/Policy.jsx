import React from 'react'
import { Col, Row } from 'react-bootstrap';
import styles from './Policy.module.scss';

export default function Policy() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    return (
        <div>
            <h2>Chính sách tại {appName}</h2>
            <span className={styles.subtxt}>Với cam kết mang đến sự hài lòng tuyệt đối cho khách hàng, {appName} chú trọng vào chất lượng sản phẩm và dịch vụ tốt nhất. Chúng tôi cam kết chỉ bán các sản phẩm chất lượng tốt nhất đến quý khách.</span>
            <Row className='mt-4'>
                <Col className='text-center'>
                    <div className='d-flex justify-content-center mb-3'>
                        <img src='./free-delivery.png' alt='icon' loading='lazy' />
                    </div>
                    <h4>Miễn phí vận chuyển</h4>
                    <span>Cho tất cả đơn hàng trong nội thành Hà Nội</span>
                </Col>
                <Col className='text-center'>
                    <div className='d-flex justify-content-center mb-3'>
                        <img src='./return.png' alt='icon' loading='lazy' />
                    </div>
                    <h4>Miễn phí đổi - trả</h4>
                    <span>Đối với sản phẩm lỗi sản xuất hoặc vận chuyển</span>
                </Col>
                <Col className='text-center'>
                    <div className='d-flex justify-content-center mb-3'>
                        <img src='./customer-service.png' alt='icon' loading='lazy' />
                    </div>
                    <h4>Hỗ trợ nhanh chóng</h4>
                    <span>Gọi Hotline: 12345678 để được hỗ trợ ngay lập tức</span>
                </Col>
                <Col className='text-center'>
                    <div className='d-flex justify-content-center mb-3'>
                        <img src='./member-card.png' alt='icon' loading='lazy' />
                    </div>
                    <h4>Ưu đãi thành viên</h4>
                    <span>Đăng ký thành viên để được nhận được nhiều khuyến mãi</span>
                </Col>
            </Row>
        </div>
    )
}
