import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/Contexts/UserContext';

function AccountInformation() {
    const { userInfo, loading } = useContext(UserContext); // Get user info from context
    const [userData, setUserData] = useState({});
    const [initialData, setInitialData] = useState({});
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    const token = getToken();

    // Update userData state when userInfo changes
    useEffect(() => {
        if (userInfo) {
            setUserData(userInfo);
            setInitialData(userInfo);
            setIsFirstLoad(false);
        }
    }, [userInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Check if data has changed compared to initial data
    const isDataChanged = () => {
        return (
            userData.full_name !== initialData.full_name ||
            userData.email !== initialData.email ||
            userData.phone !== initialData.phone ||
            userData.address !== initialData.address ||
            userData.gender !== initialData.gender
        );
    };

    // Save data when the user clicks "Save"
    const handleSave = async () => {
        // Kiểm tra các trường bắt buộc
        if (!userData.full_name || !userData.email || !userData.phone || !userData.gender || !userData.address) {
            alert("Vui lòng điền đầy đủ tất cả các trường bắt buộc.");
            return; // Dừng hàm nếu có trường trống
        }

        if (isDataChanged()) {
            try {
                const response = await fetch('http://127.0.0.1:8000/user/update/', {
                    method: 'PUT', // Correct HTTP method
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    body: JSON.stringify(
                        {
                            'full_name': userData.full_name,
                            'phone': userData.phone,
                            'gender': userData.gender,
                            'address': userData.address
                        }
                    ), // Stringify the data before sending
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success("Cập nhật thông tin thành công.")
                    window.location.reload();
                } else {
                    console.error('Error saving data:', data.message);
                    alert("Có lỗi xảy ra vui lòng thử lại!");
                }
            } catch (error) {
                console.error('Error saving data:', error);
                alert("Có lỗi xảy ra vui lòng thử lại!");
            }
        } else {
            alert('Dữ liệu không thay đổi');
        }
    };

    // Check if loading or first time loading
    if (loading || isFirstLoad) {
        return <div className="text-center my-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="name">Họ & Tên:</label>
                    <input
                        type="text"
                        id="name"
                        name="full_name"
                        className="form-control"
                        value={userData.full_name || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={userData.email || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={userData.phone || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="gender">Giới tính:</label>
                    <select
                        id="gender"
                        name="gender"
                        className="form-select"
                        value={userData.gender || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">--Chọn giới tính--</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address">Địa chỉ:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        value={userData.address || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        disabled={!isDataChanged()}
                        onClick={handleSave}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountInformation;
