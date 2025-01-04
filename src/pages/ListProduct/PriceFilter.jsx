import React, { useState, useEffect } from 'react';
import styles from './ListProduct.module.scss'; // Import module SCSS

function PriceFilter({ listPrice, onPriceChange, category_id, currentPage }) {
    const [selectedPrices, setSelectedPrices] = useState([]); // State lưu khoảng giá đã chọn

    // Xử lý sự kiện khi checkbox thay đổi
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedPrices((prevSelected) =>
            checked
                ? [...prevSelected, value] // Thêm khoảng giá nếu checkbox được chọn
                : prevSelected.filter((item) => item !== value) // Loại bỏ nếu bỏ chọn
        );
    };

    // Hàm lấy số bé nhất và số lớn nhất
    const getMinMaxPrice = () => {
        const prices = selectedPrices
            .map((item) => item.split('-')) // Tách chuỗi thành mảng [minPrice, maxPrice]
            .flat() // "Phẳng" mảng
            .map(Number); // Chuyển đổi thành số nguyên

        if (prices.length === 0) return { min: null, max: null };

        return {
            min: Math.min(...prices), // Lấy số nhỏ nhất
            max: Math.max(...prices), // Lấy số lớn nhất
        };
    };

    const { min, max } = getMinMaxPrice();

    // Gọi callback để truyền dữ liệu lên cha
    useEffect(() => {
        if (onPriceChange) {
            onPriceChange(min, max, category_id, currentPage);
        }
    }, [min, max, currentPage]);

    return (
        <div className={`mb-5 ${styles.fillter}`}>
            <h4>Lọc theo giá:</h4>
            <div className={`${styles.listPrice}`}>
                {listPrice.map((price, index) => (
                    <div key={index} className={`${styles.priceFillter}`}>
                        {price.minPrice === 1000000 ? (
                            <>
                                <input
                                    type="checkbox"
                                    id={`price-${index}`}
                                    name="priceFilter"
                                    value={`${price.minPrice}-${price.maxPrice}`}
                                    onChange={handleCheckboxChange} // Gọi hàm xử lý thay đổi
                                />
                                <label htmlFor={`price-${index}`} className="ms-2">
                                    <span>Lớn hơn 1 triệu</span>
                                </label>
                            </>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    id={`price-${index}`}
                                    name="priceFilter"
                                    value={`${price.minPrice}-${price.maxPrice}`}
                                    onChange={handleCheckboxChange} // Gọi hàm xử lý thay đổi
                                />
                                <label htmlFor={`price-${index}`} className="ms-2">
                                    <span>Từ: </span>
                                    <span>{price.minPrice.toLocaleString()}đ - </span>
                                    <span>{price.maxPrice.toLocaleString()}đ</span>
                                </label>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PriceFilter;
