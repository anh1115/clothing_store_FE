import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import styles from './Checkout.module.scss'; // Import module SCSS
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from './ModalSuccess';
import { useCart } from '../../components/Contexts/CartContext';

export default function Checkout() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [orderDataResponse, setOrderDataResponse] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [shippingMethod, setShippingMethod] = useState('COD');

    const { removeFromCart } = useCart();

    // State lưu trữ danh sách tỉnh/thành/quận/huyện
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // State lưu trữ giá trị đã chọn
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        note: ''
    });

    const totalAmount = selectedProducts.reduce((total, item) => {
        return total + item.product_sell_price * item.quantity;
    }, 0);
    const shipPrice = 40000;

    useEffect(() => {
        // Lấy dữ liệu sản phẩm từ sessionStorage
        const products = JSON.parse(sessionStorage.getItem('selectedProducts')) || [];
        if (products.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
            // Sử dụng useNavigate để chuyển hướng
            navigate('/cart');
            return;
        }
        setSelectedProducts(products);

        // Gọi API lấy danh sách tỉnh/thành
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => setProvinces(response.data))
            .catch((error) => console.error("Error fetching provinces:", error));
    }, [navigate]);

    // Xử lý thay đổi input text
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Lấy quận/huyện khi chọn tỉnh/thành phố
    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setSelectedDistrict('');
        setSelectedWard('');
        setDistricts([]);
        setWards([]);

        if (provinceCode) {
            axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
                .then((response) => setDistricts(response.data.districts))
                .catch((error) => console.error("Error fetching districts:", error));
        }
    };

    // Lấy phường/xã khi chọn quận/huyện
    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        setSelectedWard('');
        setWards([]);

        if (districtCode) {
            axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then((response) => setWards(response.data.wards))
                .catch((error) => console.error("Error fetching wards:", error));
        }
    };

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    // Xử lý khi nhấn nút "Đặt hàng"
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn hành vi submit mặc định

        // Kiểm tra dữ liệu trước khi log
        if (!formData.fullName || !formData.phoneNumber || !formData.address || !selectedProvince || !selectedDistrict || !selectedWard) {
            alert('Vui lòng điền đầy đủ thông tin trước khi đặt hàng!');
            return;
        }

        const orderInfo = {
            full_name: formData.fullName,
            phone: formData.phoneNumber,
            address: `${formData.address}, ${wards.find(w => String(w.code) === String(selectedWard))?.name || 'N/A'}, ${districts.find(d => String(d.code) === String(selectedDistrict))?.name || 'N/A'}, ${provinces.find(p => String(p.code) === String(selectedProvince))?.name || 'N/A'}`,
            payment_method: shippingMethod,
            note: formData.note,
            items: selectedProducts,
            // totalAmount: totalAmount + shipPrice
        };
        const token = getToken();

        // Gửi data đến API
        fetch('http://127.0.0.1:8000/cart/create_order/', {
            method: 'POST', // Sử dụng phương thức POST
            headers: {
                'Content-Type': 'application/json', // Định dạng dữ liệu JSON
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(orderInfo) // Chuyển dữ liệu thành JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Chuyển đổi phản hồi thành JSON
            })
            .then(data => {
                console.log("Phản hồi từ API:", data);
                // Lặp qua mảng order_lines để lấy product_id, size_name và color_name
                data.order_lines.forEach(line => {
                    const productId = line.product_id;
                    const sizeId = line.size_id;  // Giả sử size_name là sizeId
                    const colorId = line.color_id; // Giả sử color_name là colorId

                    // Gọi hàm xóa sản phẩm
                    removeFromCart(productId, sizeId, colorId);
                });
                setOrderDataResponse(data);
                setShowModal(true);
            })
            .catch(error => {
                console.error("Lỗi khi gửi dữ liệu tới API:", error);
                alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
            });
    };

    // Hàm đóng modal và chuyển hướng về trang chủ
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/'); // Chuyển hướng về trang chủ
    };

    return (
        <div className="container">
            <Helmet>
                <title>Thanh toán - {appName}</title>
            </Helmet>
            {showModal && <ModalSuccess data={orderDataResponse} onClose={handleCloseModal} />}
            <Row className={`mt-4`}>
                <Col>
                    <h2>Thông tin nhận hàng</h2>
                    <form className={`mt-3`}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="fullName"
                            placeholder='Họ & Tên'
                            className="form-control mb-3"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder='Số điện thoại'
                            className="form-control mb-3"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder='Địa chỉ'
                            className="form-control mb-3"
                            value={formData.address}
                            onChange={handleInputChange}
                        />

                        <select className="form-control mb-3" value={selectedProvince} onChange={handleProvinceChange}>
                            <option value="">Chọn Tỉnh/Thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.code} value={province.code}>{province.name}</option>
                            ))}
                        </select>

                        <select className="form-control mb-3" value={selectedDistrict} onChange={handleDistrictChange}>
                            <option value="">Chọn Quận/Huyện</option>
                            {districts.map((district) => (
                                <option key={district.code} value={district.code}>{district.name}</option>
                            ))}
                        </select>

                        <select className="form-control mb-3" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                            <option value="">Chọn Phường/Xã</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>{ward.name}</option>
                            ))}
                        </select>

                        {/* Phương thức vận chuyển */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Phương thức vận chuyển: </label>
                            <div className={`${styles.paymentMethod}`}>
                                <label className="me-3">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="cash_on_delivery"
                                        checked={shippingMethod === 'cash_on_delivery'}
                                        onChange={(e) => setShippingMethod(e.target.value)}
                                    /> COD (Thanh toán khi nhận hàng)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="payment_method"
                                        checked={shippingMethod === 'payment_method'}
                                        onChange={(e) => setShippingMethod(e.target.value)}
                                    /> Chuyển khoản ngân hàng
                                </label>
                            </div>
                        </div>

                        <textarea name="note" id="note" placeholder='Ghi chú' className="form-control mb-3" value={formData.note}
                            onChange={handleInputChange}></textarea>
                        <button type="submit">Đặt hàng</button>
                    </form>
                </Col>
                <Col>
                    <h2>Thông tin đơn hàng</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map((item, index) => (
                                <tr key={`${item.product_id}-${item.size_id}-${item.color_id}`}>
                                    <td className='d-flex'>
                                        <div className='me-2'>
                                            <img
                                                src={'http://127.0.0.1:8000' + item.first_image_url}
                                                className={``}
                                                alt={item.name}
                                                width={60}
                                                loading='lazy'
                                            />
                                        </div>
                                        <div>
                                            {item.product_name}
                                            <div>
                                                <span>Màu: {item.color_name}</span>
                                                <br />
                                                <span>Size: {item.size_name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.product_sell_price * item.quantity).toLocaleString()}đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <div className={`text-end mt-3 ${styles.sumPrice}`}>
                            <span>Tạm tính: <b>{totalAmount.toLocaleString()}đ</b></span>
                            <br />
                            <span>Phí ship: <b>{shipPrice.toLocaleString()}đ</b></span>
                        </div>
                        <div className={`text-end mt-3`}>
                            <span>Tổng thanh toán: <b>{(totalAmount + shipPrice).toLocaleString()}đ</b></span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
