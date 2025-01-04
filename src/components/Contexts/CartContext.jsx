import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Tạo context
const CartContext = createContext();

// Tạo Provider để cung cấp dữ liệu
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Kiểm tra đăng nhập từ localStorage
    const isLoggedIn = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token !== undefined : false;
    };

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    // Lấy toàn bộ giỏ hàng từ server
    const fetchCartItems = async () => {
        if (!isLoggedIn()) return;

        try {
            const token = getToken();
            const response = await fetch('http://127.0.0.1:8000/cart/view/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data.items); // Giả sử API trả về { items: [...] }
            } else {
                toast.error('Không thể tải giỏ hàng.');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Lỗi kết nối đến server.');
        }
    };

    // Cập nhật trạng thái chọn sản phẩm
    const updateSelectedItems = (productId, sizeId, colorId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product_id === productId && item.size_id === sizeId && item.color_id === colorId
                    ? { ...item, isSelected: !item.isSelected }
                    : item
            )
        );
    };

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (product) => {
        if (!isLoggedIn()) {
            toast.warn('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
            return;
        }

        try {
            const token = getToken();
            const response = await fetch('http://127.0.0.1:8000/cart/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    color_id: product.color_id || null, // Xử lý trường hợp color_id không có
                    size_id: product.size_id || null,   // Xử lý trường hợp size_id không có
                    quantity: product.quantity || 1,    // Mặc định quantity = 1
                }),
            });

            if (response.ok) {
                toast.success('Thêm vào giỏ hàng thành công!');
                fetchCartItems(); // Load lại giỏ hàng sau khi thêm thành công
            } else if (response.status === 400) { 
                // Kiểm tra nếu status là 400
                const errorData = await response.json();
                alert(errorData.error || 'Số lượng còn lại không đủ.');
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Có lỗi xảy ra khi thêm vào giỏ hàng.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Lỗi kết nối đến server.');
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = async (productId, sizeId, colorId) => {
        if (!isLoggedIn()) {
            toast.warn('Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng.');
            return;
        }

        try {
            const token = getToken();
            const response = await fetch('http://127.0.0.1:8000/cart/remove/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    product_id: productId,
                    size_id: sizeId,
                    color_id: colorId,
                }),
            });

            if (response.ok) {
                if (!location.pathname.includes('/checkout')) {
                    toast.success('Xóa sản phẩm thành công!');
                }
                fetchCartItems(); // Load lại giỏ hàng
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Không thể xóa sản phẩm.');
            }
        } catch (error) {
            console.error('Error removing product:', error);
            toast.error('Lỗi kết nối đến server.');
        }
    };

    // Hàm để cập nhật số lượng sản phẩm trong giỏ
    const updateQuantityInCart = async (productId, size, color, newQuantity) => {
        // Kiểm tra số lượng mới hợp lệ (ít nhất là 1)
        if (newQuantity < 1) return;
        const token = getToken();

        try {
            // Gửi request PUT đến API để cập nhật số lượng
            const response = await fetch('http://127.0.0.1:8000/cart/update/', {
                method: 'PUT',  // Phương thức PUT để cập nhật dữ liệu
                headers: {
                    'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    product_id: productId,  // ID sản phẩm
                    size_id: size,        // Tên size sản phẩm
                    color_id: color,      // Tên màu sản phẩm
                    quantity: newQuantity,  // Số lượng mới
                }),
            });

            // Kiểm tra kết quả trả về từ API
            if (response.ok) {
                const updatedCartItems = await response.json(); // Nhận dữ liệu giỏ hàng đã cập nhật từ API
                setCartItems(updatedCartItems); // Cập nhật giỏ hàng trong state của React
            } else {
                console.error('Failed to update cart quantity');
            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };


    // Load giỏ hàng khi component được mount
    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantityInCart, fetchCartItems, isLoggedIn, updateSelectedItems }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook dùng để gọi Context
export const useCart = () => useContext(CartContext);
