import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import './Introduce.scss';

export default function Introduce() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    return (
        <div className='container'>
            <Helmet>
                <title>Giới thiệu - {appName}</title>
            </Helmet>
            <Row className='mt-4 d-flex align-items-center'>
                <Col md={8} xs={12}>
                    <h2 className='text-start text-danger'>Về Chúng Tôi</h2>
                    <span>
                        {appName} không chỉ là một cửa hàng thời trang nữ đơn thuần, mà còn là điểm đến lý tưởng cho những cô gái đam mê thời trang, yêu thích sự sang trọng và đẳng cấp. Với một sứ mệnh tôn vinh vẻ đẹp và phong cách riêng biệt của mỗi người phụ nữ, {appName} đã trở thành biểu tượng của sự uy tín và chất lượng trong ngành thời trang.
                    </span>
                </Col>
                <Col md={4} xs={12}>
                    <img src="../about_1.webp" alt="image" loading='lazy' />
                </Col>
            </Row>
            <Row className='mt-4 d-flex align-items-center'>
                <Col md={4} xs={12}>
                    <img src="../about_1.webp" alt="image" loading='lazy' />
                </Col>
                <Col md={8} xs={12}>
                    <h2 className='text-start text-danger'>Uy Tín và Chất Lượng</h2>
                    <span>
                        {appName} tự hào là địa chỉ tin cậy của hàng ngàn khách hàng. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng tốt nhất, từ chất liệu cho đến kiểu dáng và công nghệ sản xuất. Mỗi sản phẩm tại {appName} đều được lựa chọn kỹ lưỡng, đảm bảo vừa vặn và phản ánh đúng phong cách của người mặc.
                    </span>
                </Col>
            </Row>
            <Row className='mt-4 d-flex align-items-center'>
                <Col md={8} xs={12}>
                    <h2 className='text-start text-danger'>Chính Sách</h2>
                    <span>
                        {appName} luôn đặt sự hài lòng và lợi ích của khách hàng lên hàng đầu. Chúng tôi không chỉ cung cấp những sản phẩm chất lượng mà còn mang đến dịch vụ chăm sóc khách hàng tận tình và chuyên nghiệp. Chính sách đổi trả linh hoạt, giao hàng nhanh chóng và an toàn, cùng với các ưu đãi và khuyến mãi đặc biệt, là cam kết của chúng tôi để khách hàng luôn có trải nghiệm mua sắm tốt nhất.
                    </span>
                </Col>
                <Col md={4} xs={12}>
                    <img src="../about_1.webp" alt="image" loading='lazy' />
                </Col>
            </Row>
            <div className='text-center'>
                <h2 className='text-danger'>Chính sách tại {appName}</h2>
                <span className='content'>Với cam kết mang đến sự hài lòng tuyệt đối cho khách hàng, {appName} chú trọng vào chất lượng sản phẩm và dịch vụ tốt nhất. Chúng tôi cam kết chỉ bán các sản phẩm chất lượng tốt nhất đến quý khách.</span>
            </div>
        </div>
    )
}
