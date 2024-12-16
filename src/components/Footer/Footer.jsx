import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
    const appName = import.meta.env.VITE_REACT_APP_NAME;

    return (
        <footer className={`${styles.footer}`}>
            <div className={`container`}>
                <div className={`${styles.ft_bottom}`}>
                    <Link to={'/'}><h2 className={`fw-bold ${styles.logo}`}>{appName}</h2></Link>
                    <span className='text-center'>{appName} không chỉ là một cửa hàng thời trang nữ đơn thuần, mà còn là điểm đến lý tưởng cho những cô gái đam mê thời trang, yêu thích sự sang trọng và đẳng cấp. Với một sứ mệnh tôn vinh vẻ đẹp và phong cách riêng biệt của mỗi người phụ nữ, {appName} đã trở thành biểu tượng của sự uy tín và chất lượng trong ngành thời trang.</span>
                </div>
                <div className={`container ${styles['copyright']}`}>
                    <p>&copy; 2024 {appName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
