import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import styles from './Checkout.module.scss'; // Import module SCSS

const ModalSuccess = ({ data, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName={styles.modal_60w}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đặt hàng thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Mã đơn: <b>{data.order.order_id}</b></span>
          <br />
          <span><strong>Thông tin người nhận:</strong></span>
          <div>
            <span>Họ & Tên: <b>{data.user.full_name}</b></span>
            <br />
            <span>Điện thoại: <b>{data.user.phone}</b></span>
            <br />
            <span>Địa chỉ nhận hàng: <b>{data.user.address}</b></span>
            <br />
            <span>Phương thức thanh toán: <b>{(data.order.payment_method) == "cash_on_delivery" ? "Thanh toán khi nhận hàng" : "Chuyển khoản"}</b></span>
            <br />
            <span>Ghi chú: <b></b></span>
          </div>
          <span><strong>Thông tin sản phẩm:</strong></span>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Màu</th>
                  <th>Size</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {data.order_lines.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img src={'http://127.0.0.1:8000' + item.first_image_url} alt={item.product_name} width={60} />
                        <span className='ms-3'>{item.product_name}</span>
                      </div>
                    </td>
                    <td>{item.color_name}</td>
                    <td>{item.size_name}</td>
                    <td>{(item.sell_price).toLocaleString()}đ</td>
                    <td>{item.quantity}</td>
                    <td>{(item.subtotal).toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className='text-end'>
              <span>Phí ship: <b>40.000đ</b></span>
              <br />
              <span>Tổng thanh toán: <b>{(data.order.total_price + 40000).toLocaleString()}đ</b></span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onClose}>Đóng</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSuccess
  ;