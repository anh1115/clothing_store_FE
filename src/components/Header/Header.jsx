import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FaCartShopping, FaAngleDown, FaRightToBracket, FaUserPlus, FaClipboardCheck } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import MenuCategory from './MenuCategory';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';

const Header = () => {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    const { cartItems } = useCart(); // Lấy dữ liệu giỏ hàng từ CartContext

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
        window.location.reload();
    };

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalQuantity = cartItems.length;

    const renderUserInfo = () => {
        if (userInfo) {
            return (
                <div className={styles.info}>
                    <Link to={'/profile'}>{userInfo.full_name}</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            );
        }

        return (
            <div className={styles.link}>
                <Link to="/login">
                    <p>Login</p>
                    <FaRightToBracket />
                </Link>
                <Link to="/register">
                    <p>Register</p>
                    <FaUserPlus />
                </Link>
            </div>
        );
    };

    const renderNavLinks = () => (
        <ul>
            <li className={isActive('/') ? styles.active : ''}>
                <Link to="/">Trang chủ</Link>
            </li>
            <li className={isActive('/introduce') ? styles.active : ''}>
                <Link to="/introduce">Giới thiệu</Link>
            </li>
            <li className={styles.dropdownProducts}>
                <span>Sản phẩm</span>
                <FaAngleDown />
                <div className={`container ${styles.menu_category}`}>
                    <MenuCategory />
                </div>
            </li>
            <li className={isActive('/contact') ? styles.active : ''}>
                <Link to="/contact">Liên hệ</Link>
            </li>
            <li className={isActive('/faq') ? styles.active : ''}>
                <Link to="/faq">Câu hỏi thường gặp</Link>
            </li>
        </ul>
    );

    return (
        <header className={styles.header}>
            <div className='container'>
                {/* Topbar */}
                <div className={styles.topbar}>
                    <div className="logo">
                        <h2>{appName}</h2>
                    </div>
                    {renderUserInfo()}
                </div>

                {/* Centerbar */}
                <div className={styles.centerbar}>
                    <Search />
                    <Link to={'/'}>
                    <img src="../Logo.jpg" alt="logo" loading='lazy' width={80} />
                    </Link>
                    <div className={styles.rightContent}>
                        <Link to={'/order-status'}>
                            <div className={styles.check}>
                                <FaClipboardCheck />
                                <span>Đơn hàng</span>
                            </div>
                        </Link>
                        <Link to={'/cart'}>
                            <div className={styles.cart}>
                                <p className={styles.totalProductInCard}>
                                    {totalQuantity > 99 ? "99+" : totalQuantity}
                                </p>
                                <FaCartShopping />
                                <span>Giỏ hàng</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='position-relative'>
                    {renderNavLinks()}
                </nav>
            </div>
        </header>
    );
};

export default Header;
