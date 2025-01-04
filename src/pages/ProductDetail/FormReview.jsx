import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function FormReview({ product_id, product_name, orderline_id, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState('');

  const getToken = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo)?.token : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ product_id, rating, comment: content, orderline_id }),
      });

      if (response.ok) {
        toast.success('Gửi đánh giá thành công!');
        onClose(); // Tắt modal sau khi gửi
      } else {
        throw new Error('Có lỗi khi gửi đánh giá!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal show={true} onHide={onClose} backdrop="static" centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Đánh giá sản phẩm: <br />{product_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Số sao</Form.Label>
          <div>
            {[...Array(5)].map((_, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={index + 1}
                  onClick={() => setRating(index + 1)}
                  style={{ display: 'none' }}
                />
                <FaStar
                  size={30}
                  color={index + 1 <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  onMouseEnter={() => setHover(index + 1)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            ))}
          </div>
          <Form.Group className='mt-3'>
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <button type="submit" className='mt-3'>Gửi đánh giá</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FormReview;
