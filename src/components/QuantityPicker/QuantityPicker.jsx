import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import styles from './QuantityPicker.module.scss';

export default function QuantityPicker({ value, onChange, maxQuantity = 10 }) {
  // Hàm giảm số lượng
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  // Hàm tăng số lượng
  const handleIncrease = () => {
    if (value < maxQuantity) {
      onChange(value + 1);
    }
  };

  // Hàm thay đổi giá trị khi người dùng nhập
  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);

    // Kiểm tra giá trị hợp lệ và không âm
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onChange(value);
    }
  };

  return (
    <InputGroup className={`mb-3 ${styles['quantity']}`}>
      <Button variant="outline-secondary" onClick={handleDecrease} disabled={value <= 1}>
        -
      </Button>
      <FormControl
        type="number"
        value={value}
        onChange={handleChange}
        style={{ textAlign: 'center' }}
        min="1"
        max={maxQuantity}
      />
      <Button variant="outline-secondary" onClick={handleIncrease} disabled={value >= maxQuantity}>
        +
      </Button>
    </InputGroup>
  );
}
