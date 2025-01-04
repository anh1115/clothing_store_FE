import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import { useCart } from '../../components/Contexts/CartContext';
import { Helmet } from 'react-helmet-async';

// Component cho mỗi mục trong giỏ hàng
const CartItem = ({ item, handleQuantityChange, handleRemove, handleSelect, selectedItems }) => {
    const { product_id, product_name, first_image_url, size_id, size_name, color_id, color_name, product_sell_price, quantity } = item;
    const isSelected = selectedItems[`${product_id}-${size_id}-${color_id}`] || false;

    return (
        <tr key={`${product_id}-${size_name}-${color_name}`}>
            <td>
                {/* Checkbox để chọn sản phẩm */}
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                        handleSelect(product_id, size_id, color_id);
                    }}
                />
            </td>
            <th scope="row">{item.index + 1}</th>
            <td className={styles.infoProduct}>
                <img src={`http://localhost:8000/${first_image_url}`} alt={product_name} loading='lazy' />
                <div>
                    <Link to={`/product/${product_id}`}>{product_name}</Link>
                    <div>
                        <span>Màu: {color_name}</span><br />
                        <span>Size: {size_name}</span>
                    </div>
                    <div>
                        {/* Nút xóa sản phẩm */}
                        <button
                            className={styles.removeProduct}
                            onClick={() => handleRemove(product_id, size_id, color_id)}
                        >
                            <FaRegTrashCan />
                        </button>
                    </div>
                </div>
            </td>
            <td className={styles.price}>{product_sell_price.toLocaleString()}đ</td>
            <td>
                <div className={`d-flex align-items-center ${styles.boxQty}`}>
                    <button
                        className={`btn btn-sm btn-secondary ${styles.qty_minus}`}
                        onClick={() =>
                            handleQuantityChange(product_id, size_id, color_id, Math.max(1, quantity - 1))
                        }
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className={`form-control mx-2 ${styles.numberQty}`}
                        value={quantity}
                        min="1"
                        onChange={e =>
                            handleQuantityChange(product_id, size_id, color_id, parseInt(e.target.value) || 1)
                        }
                    />
                    <button
                        className={`btn btn-sm btn-secondary ${styles.qty_plus}`}
                        onClick={() =>
                            handleQuantityChange(product_id, size_id, color_id, quantity + 1)
                        }
                    >
                        +
                    </button>
                </div>
            </td>
            <td className={styles.price}>{(product_sell_price * quantity).toLocaleString()}đ</td>
        </tr>
    );
};

export default function Cart() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const { cartItems, fetchCartItems, removeFromCart, updateQuantityInCart, updateSelectedItems } = useCart(); // Thêm removeFromCart từ CartContext
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('selectedProducts');
        fetchCartItems();
    }, []);

    const handleQuantityChange = (productId, size, color, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantityInCart(productId, size, color, newQuantity);
    };

    const handleRemove = (productId, sizeId, colorId) => {
        removeFromCart(productId, sizeId, colorId); // Gọi hàm xóa sản phẩm
    };

    // Cập nhật trạng thái của checkbox "Chọn tất cả"
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        // Cập nhật trạng thái của tất cả các checkbox sản phẩm
        const newSelectedItems = {};
        cartItems.forEach(item => {
            newSelectedItems[`${item.product_id}-${item.size_id}-${item.color_id}`] = newSelectAll;
        });
        setSelectedItems(newSelectedItems);  // Cập nhật lại selectedItems
    };

    const handleSelect = (product_id, size_id, color_id) => {
        const key = `${product_id}-${size_id}-${color_id}`;
        setSelectedItems(prevSelectedItems => {
            const newSelectedItems = { ...prevSelectedItems, [key]: !prevSelectedItems[key] };

            // Kiểm tra xem tất cả các sản phẩm có được chọn không
            const allSelected = cartItems.every(item => newSelectedItems[`${item.product_id}-${item.size_id}-${item.color_id}`]);
            setSelectAll(allSelected);  // Cập nhật lại trạng thái "Chọn tất cả"
            return newSelectedItems;
        });
    };

    const handleCheckout = () => {
        const selectedProducts = cartItems.filter(item => selectedItems[`${item.product_id}-${item.size_id}-${item.color_id}`]);

        if (selectedProducts.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
            return;
        }

        sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

        // Sử dụng useNavigate để chuyển hướng
        navigate('/checkout');
    };

    // Hàm tính tổng tiền giỏ hàng
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product_sell_price * item.quantity);
        }, 0);
    };

    const totalPrice = getTotalPrice();

    //Tính tổng tiền các sản phẩm được chọn
    const getSelectedTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const isSelected = selectedItems[`${item.product_id}-${item.size_id}-${item.color_id}`];
            if (isSelected) {
                total += item.product_sell_price * item.quantity;
            }
            return total;
        }, 0);
    };

    const totalSelectPrice = getSelectedTotalPrice();

    return (
        <div className={`container mt-4`}>
            <Helmet>
                <title>Giỏ hàng - {appName}</title>
            </Helmet>
            {cartItems.length === 0 ? (
                <div className={`text-center py-5`}>
                    <img src="./cart-empty.png" alt="cart-empty" className={`${styles.cart_empty}`} loading='lazy' />
                    <h3>Không có sản phẩm trong giỏ hàng</h3>
                    <div className={`${styles.toHome}`}>
                        <Link to={'/'}>
                            Trang chủ
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    {/* Checkbox "Chọn tất cả" */}
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th scope="col">STT</th>
                                <th scope="col">Thông tin sản phẩm</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <CartItem
                                    key={`${item.product_id}-${item.size_name}-${item.color_name}`}
                                    item={{ ...item, index }}
                                    handleQuantityChange={handleQuantityChange}
                                    handleRemove={handleRemove} // Truyền hàm xóa xuống
                                    handleSelect={handleSelect} // Truyền hàm chọn vào
                                    selectedItems={selectedItems}  // Truyền selectedItems vào
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className={`text-end`}>
                        <span><b>Tổng tiền sản phẩm đã chọn: </b> <span className={styles.totalPrice}>{totalSelectPrice.toLocaleString()}đ</span></span>
                        <br />
                        <span><b>Tổng tiền trong giỏ: </b> <span className={styles.totalPrice}>{totalPrice.toLocaleString()}đ</span></span>
                        <button className={`mt-3 ${styles.checkout}`} onClick={handleCheckout}>Thanh toán</button>
                    </div>
                </>
            )}
        </div>
    );
}
