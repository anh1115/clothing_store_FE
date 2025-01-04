import React, { useState, useEffect } from 'react';
import styles from './VNPay.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function VNPay() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        // Hàm để lấy dữ liệu từ URL (giả sử dữ liệu trả về từ VNPay được đính kèm trong URL query string)
        const fetchData = () => {
            const urlParams = new URLSearchParams(window.location.search); // Lấy các tham số từ URL

            // Tạo một đối tượng để chứa dữ liệu từ query string
            const data = {
                vnp_Amount: urlParams.get('vnp_Amount'),
                vnp_BankCode: urlParams.get('vnp_BankCode'),
                vnp_BankTranNo: urlParams.get('vnp_BankTranNo'),
                vnp_CardType: urlParams.get('vnp_CardType'),
                vnp_OrderInfo: urlParams.get('vnp_OrderInfo'),
                vnp_PayDate: urlParams.get('vnp_PayDate'),
                vnp_ResponseCode: urlParams.get('vnp_ResponseCode'),
                vnp_TmnCode: urlParams.get('vnp_TmnCode'),
                vnp_TransactionNo: urlParams.get('vnp_TransactionNo'),
                vnp_TransactionStatus: urlParams.get('vnp_TransactionStatus'),
                vnp_TxnRef: urlParams.get('vnp_TxnRef'),
                vnp_SecureHash: urlParams.get('vnp_SecureHash'),
            };

            setPaymentData(data); // Lưu dữ liệu vào state
        };

        fetchData(); // Gọi hàm fetch khi component render
    }, []);

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    useEffect(() => {
        if (paymentData) { // Kiểm tra nếu paymentData đã được xác định
            const sendDataToApi = async () => {
                const token = getToken();
                try {
                    const response = await fetch("http://127.0.0.1:8000/cart/vnpay/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${token}`, // Nếu có token
                        },
                        body: JSON.stringify(paymentData), // Chuyển dữ liệu thành JSON
                    });

                    console.log(paymentData);

                    // Kiểm tra phản hồi từ API
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Error from API:", errorData);
                    } else {
                        const responseData = await response.json();
                        console.log("Success:", responseData);
                    }
                } catch (error) {
                    console.error("Error sending data to API:", error);
                }
            };

            // Gọi hàm gửi dữ liệu
            sendDataToApi();
        }
    }, [paymentData]); // Đảm bảo chỉ gọi API khi paymentData đã được xác định

    return (
        <div className='container text-center mt-3'>
            <Helmet>
                <title>{appName}</title>
            </Helmet>
            <h3 className='fw-bold'>Thông tin thanh toán từ VNPay</h3>
            {paymentData ? (
                <div className='mt-5'>
                    {/* Kiểm tra trạng thái thanh toán */}
                    {paymentData.vnp_TransactionStatus === '00' ? (
                        <div className={`${styles.content_payment}`}>
                            <img src="../payment-success-icon.png" alt="payment-success" />
                            <h2 className='text-danger'>Thanh toán thành công!</h2>
                            <Link to={'/order-status'} className={`mt-4 ${styles.button_link}`}>Về đơn hàng</Link>
                        </div>
                    ) : (
                        <div className={`${styles.content_payment}`}>
                            <img src="../payment-error.png" alt="payment-success" />
                            <h2 className='text-danger'>Thanh toán thất bại!</h2>
                            <Link to={'/order-status'} className={`mt-4 ${styles.button_link}`}>Về đơn hàng</Link>
                        </div>
                    )}
                </div>
            ) : (
                <p>Đang tải dữ liệu từ VNPay...</p>
            )}
        </div>
    );
}

export default VNPay;
