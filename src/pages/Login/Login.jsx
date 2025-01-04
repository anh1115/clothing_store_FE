import React, { useState } from 'react';
import styles from './Login.module.scss'; // Import file SCSS riêng
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/user/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors || {});
                toast.error('Email hoặc mật khẩu không chính xác.');
            } else {
                toast.success('Đăng nhập thành công!');
                localStorage.setItem('userInfo', JSON.stringify({
                    user_id: result.user_id,
                    full_name: result.user_name,
                    token: result.token
                })); // Lưu vào localStorage
                setErrors({});
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            toast.error('Lỗi kết nối đến máy chủ. Vui lòng thử lại sau!');
        }
    };

    return (
        <div className="container">
            <Helmet>
                <title>Login - {appName}</title>
            </Helmet>
            <h2>Login</h2>
            <div className={styles.loginForm}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className={styles.error}>{errors.email[0]}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className={styles.error}>{errors.password[0]}</p>}

                    <button type="submit">Login</button>
                </form>
                <div className={styles.link}>
                    <a href="/register">Bạn chưa có tài khoản?</a>
                    <a href="/forgot-password">Quên mật khẩu?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
