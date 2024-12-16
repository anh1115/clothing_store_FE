import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';
import { Helmet } from 'react-helmet-async';

export default function Page404() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    return (
        <>
            <Helmet>
                <title>NotFound - {appName}</title> {/* Set title với tên sản phẩm */}
            </Helmet>
            <div className={`text-center ${styles.page404}`}>
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Oops!</span> Trang không tồn tại.</p>
                <p className="lead">
                    Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
                </p>
                <Link to="/" className="btn btn-primary">Quay lại Trang chủ</Link>
            </div>
        </>
    );
}
