import React, { useState } from "react";
import styles from './ProductDetail.module.scss';

const ProductSizes = ({ product, selectedSize, onSizeSelect }) => {
    // Hàm xử lý khi người dùng chọn kích cỡ
    const handleSizeSelect = (size) => {
        onSizeSelect(size); // Truyền đối tượng size lên component cha
    };

    return (
        <div className={styles.optionSelect}>
            <span>Kích cỡ: </span>
            {/* Hiển thị các kích cỡ của sản phẩm */}
            {product.sizes.map((size, index) => (
                <span
                    key={index}
                    className={`${styles.sizeOption} ${selectedSize?.size_id === size.size_id ? styles.selected : ""}`}
                    onClick={() => handleSizeSelect(size)} // Truyền đối tượng size thay vì chỉ tên
                >
                    {size.name}
                </span>
            ))}
        </div>
    );
};

export default ProductSizes;
