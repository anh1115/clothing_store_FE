// contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Tạo context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = getToken();
                const response = await fetch('http://127.0.0.1:8000/user/detail/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    toast.error('Không thể tải thông tin người dùng.');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{ userInfo, loading }}>
            {children}
        </UserContext.Provider>
    );
};
