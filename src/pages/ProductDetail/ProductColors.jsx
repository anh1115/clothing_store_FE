import React from "react";
import styles from './ProductDetail.module.scss';

const ProductColors = ({ product, selectedColor, onColorSelect }) => {
    
    // Hàm xử lý khi người dùng chọn màu
    const handleColorSelect = (color) => {
        onColorSelect(color); // Gửi màu sắc đã chọn lên component cha
    };

    return (
        <div className={styles.optionSelect}>
            <span>Màu Sắc: </span>
            {/* Hiển thị các màu sắc của sản phẩm */}
            {product.colors.map((color, index) => (
                <span
                    key={index}
                    className={`${styles.colorOption} ${selectedColor?.color_id === color.color_id ? styles.selected : ""}`}
                    onClick={() => handleColorSelect(color)}
                >
                    {color.name}
                </span>
            ))}
        </div>
    );
};

export default ProductColors;
