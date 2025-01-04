import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Table from 'react-bootstrap/Table';
import styles from './OrderStatus.module.scss';
import { toast } from 'react-toastify'; // Thêm thư viện thông báo
import FormReview from '../ProductDetail/FormReview';
import { Link } from 'react-router-dom';

function OrderStatus() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const [listOrder, setListOrder] = useState([]);
    const [reviewData, setReviewData] = useState(null);
    const [showModal, setShowModal] = useState(false); // State quản lý hiển thị modal

    // Hàm kiểm tra đăng nhập
    const isLoggedIn = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? true : false;
    };

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    // Hàm fetch danh sách đơn hàng từ API
    const fetchOrderItems = async () => {
        if (!isLoggedIn()) {
            toast.error('Bạn chưa đăng nhập.');
            return;
        }

        try {
            const token = getToken();
            const response = await fetch('http://127.0.0.1:8000/cart/orders/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setListOrder(data || []); // Giả sử API trả về { orders: [...] }
            } else {
                toast.error('Không thể tải danh sách đơn hàng.');
            }
        } catch (error) {
            console.error('Lỗi kết nối đến server:', error);
            toast.error('Lỗi kết nối đến server.');
        }
    };

    // Gọi hàm fetch khi component được render
    useEffect(() => {
        fetchOrderItems();
    }, []);

    // Xử lý khi mở modal đánh giá
    const handleReview = (product_id, product_name, orderline_id) => {
        setReviewData({ product_id, product_name, orderline_id });
        setShowModal(true); // Hiển thị modal
    };

    // Hàm đóng modal
    const handleCloseModal = () => {
        setReviewData(null);
        setShowModal(false); // Ẩn modal
        fetchOrderItems();
    };

    return (
        <>
            <div className='container my-3'>
                <Helmet>
                    <title>Danh sách đơn hàng - {appName}</title>
                </Helmet>
                <h2>Đơn hàng</h2>
                {listOrder.length > 0 ? (
                    listOrder.map((order) => (
                        <div key={order.order_id} className={`my-4 ${styles.order}`}>
                            <div className='d-flex justify-content-between'>
                                <span>Mã đơn: <b>{order.order_id}</b></span>
                                <span>Trạng thái đơn: <b>{order.status_display}</b></span>
                                <span>
                                    Phương thức thanh toán:{' '}
                                    <b>{order.payment_method === 'cash_on_delivery' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}</b>
                                </span>
                            </div>
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Màu</th>
                                            <th>Size</th>
                                            <th>Đơn giá</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                            <th>Đánh giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.order_lines.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className={`d-flex align-items-center ${styles.producName}`}>
                                                        <Link to={`/product/${item.product_id}`}><span className='ms-3'>{item.product_name}</span></Link>
                                                    </div>
                                                </td>
                                                <td>{item.color_name}</td>
                                                <td>{item.size_name}</td>
                                                <td>{parseInt(item.product_sell_price).toLocaleString()}đ</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.subtotal.toLocaleString()}đ</td>
                                                <td>
                                                    <button
                                                        disabled={order.status_display !== "Đã giao" || item.status_review !== 0}
                                                        onClick={() =>
                                                            handleReview(item.product_id, item.product_name, item.orderline_id)
                                                        }
                                                    >
                                                        Đánh giá
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div>
                                    <span>Tổng thanh toán: <b>{(parseInt(order.total_price) + 40000).toLocaleString()}đ</b></span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center mt-4'>
                        <h5>Không có đơn hàng nào.</h5>
                    </div>
                )}
            </div>
            {/* Hiển thị modal đánh giá khi có dữ liệu */}
            {reviewData && showModal && (
                <FormReview
                    product_id={reviewData.product_id}
                    product_name={reviewData.product_name}
                    orderline_id={reviewData.orderline_id}
                    onClose={handleCloseModal} // Truyền hàm đóng modal
                />
            )}
        </>
    );
}

export default OrderStatus;
