import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear errors when typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.name) validationErrors.name = 'Họ tên là bắt buộc.';
        if (!formData.email) validationErrors.email = 'Email là bắt buộc.';
        if (!formData.phone) validationErrors.phone = 'Điện thoại là bắt buộc.';
        if (!formData.message) validationErrors.message = 'Nội dung là bắt buộc.';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Xử lý gửi dữ liệu
            console.log('Form submitted:', formData);
            alert('Yêu cầu của bạn đã được gửi thành công!');
            setFormData({ name: '', email: '', phone: '', message: '' });
        }
    };

    return (
        <div className="container mt-4">
            <Helmet>
                <title>Liên hệ - {appName}</title>
            </Helmet>
            <Row className="mb-4">
                <Col>
                    <h4 className='mb-2 fw-bold'>Cửa hàng {appName}</h4>
                    <p className='mb-2'>
                        {appName} không chỉ là một cửa hàng thời trang nữ đơn thuần, mà còn là điểm đến lý tưởng cho những cô gái đam mê thời trang, yêu thích sự sang trọng và đẳng cấp. Với một sứ mệnh tôn vinh vẻ đẹp và phong cách riêng biệt của mỗi người phụ nữ, {appName} đã trở thành biểu tượng của sự uy tín và chất lượng trong ngành thời trang.
                    </p>
                    <Row>
                        <Col>
                            <b>Địa chỉ</b>
                            <p>TP.Hà Nội</p>
                        </Col>
                        <Col>
                            <b>Thời gian làm việc</b>
                            <p>8h - 22h <br /> Từ T2 - Chủ nhật</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Hotline</b>
                            <p>0123456789</p>
                        </Col>
                        <Col>
                            <b>Email</b>
                            <p>example@gmail.com</p>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <h4 className='mb-2 fw-bold'>Liên hệ chúng tôi</h4>
                    <p className='mb-2'>
                        Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ tên"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập nội dung"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                isInvalid={!!errors.message}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <button type="submit">
                            Gửi
                        </button>
                    </Form>
                </Col>
            </Row>
            <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.348653069698!2d105.78626477562332!3d20.97865678949691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acce194b26c9%3A0xa1090e96ee95c2dd!2zTmfDtSAyMyBOZ3V54buFbiBLaHV54bq_biwgVsSDbiBRdcOhbiwgSMOgIMSQw7RuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1732869130275!5m2!1svi!2s" width="600" height="450" style={{ border: 0, width:'100%' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}
