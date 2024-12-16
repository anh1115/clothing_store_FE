import React, { useState } from 'react';
import { toast } from 'react-toastify';

function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    const token = getToken();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Simple validation function
    const validateForm = () => {
        const { currentPassword, newPassword, confirmPassword } = formData;
        if (!currentPassword || !newPassword || !confirmPassword) {
            return 'Vui lòng điền đầy đủ thông tin.';
        }
        if (newPassword !== confirmPassword) {
            return 'Mật khẩu mới và mật khẩu xác nhận không khớp.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            alert(validationError);
            return;
        }

        //Chuẩn bị data
        const dataNew = {
            current_password: formData.currentPassword,
            new_password: formData.newPassword
        }

        try {
            // Gửi yêu cầu POST tới API
            const response = await fetch('http://127.0.0.1:8000/user/change-password/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(dataNew),
            });

            if (!response.ok) {
                // Nếu API trả về lỗi, hiển thị thông báo lỗi
                const errorData = await response.json();
                alert(errorData.message || 'Có lỗi xảy ra khi thay đổi mật khẩu.');
                return;
            }

            // Nếu thay đổi mật khẩu thành công, xử lý kết quả
            const responseData = await response.json();
            toast.success('Mật khẩu đã được thay đổi thành công!');

            // Làm gì đó sau khi thay đổi mật khẩu thành công (ví dụ: chuyển hướng trang)
        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="form-control"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-control"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu mới:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
