import React, { useState } from 'react';
import styles from './Register.module.scss'; // Import file SCSS riêng
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const navigate = useNavigate();

    // State lưu trữ thông tin form và lỗi
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });
    const [errors, setErrors] = useState({}); // Lưu lỗi trả về từ BE

    // Cập nhật form data khi người dùng nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Gửi dữ liệu đến API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: ['Mật khẩu xác nhận không khớp!'] });
            return;
        }

        const requestData = {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            address: formData.address,
            password1: formData.password,
            password2: formData.confirmPassword,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/user/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (!response.ok) {
                // Lưu lỗi từ BE vào state errors
                setErrors(result.errors || {});
            } else {
                toast.success('Đăng ký thành công!');
                setErrors({}); // Xóa lỗi cũ nếu thành công
                navigate('/login');
            }
        } catch (error) {
            toast.err('Có lỗi xảy ra. Vui lòng thử lại!');
        }
    };

    return (
        <div className="container">
            <Helmet>
                <title>Register - {appName}</title>
            </Helmet>
            <h2>Đăng ký</h2>
            <div className={styles.register}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.full_name && <p className={styles.error}>{errors.full_name[0]}</p>}

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
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <p className={styles.error}>{errors.phone[0]}</p>}

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && <p className={styles.error}>{errors.address[0]}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password1 && <p className={styles.error}>{errors.password1[0]}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.password2 &&
                        errors.password2.map((err, index) => (
                            <p key={index} className={styles.error}>
                                {err}
                            </p>
                        ))}

                    <div className={styles.gender}>
                        <span>Giới tính: </span>
                        <div className={styles.optionGender}>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === 'Male'}
                                    onChange={handleChange}
                                    required
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === 'Female'}
                                    onChange={handleChange}
                                    required
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    {errors.gender && <p className={styles.error}>{errors.gender[0]}</p>}

                    <button type="submit">Đăng ký</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
