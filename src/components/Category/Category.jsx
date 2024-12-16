import React, { useEffect, useState } from 'react';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';
import CategoryApi from '../../api/categories';

export default function Category() {
  const [listCategory, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await CategoryApi.getAll(); // Gọi API
            setCategories(response.data); // Cập nhật state với dữ liệu từ API
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    fetchCategories(); // Thực hiện gọi hàm khi component được render
}, []);

  return (
    <div>
        <h2>Danh sách danh mục</h2>
        <div className={styles.listCategory}>
          {listCategory.map((category) => (
            <Link to={`/list-product/${category.category_id}`} key={category.category_id}><span>{category.name}</span></Link>
          ))}
        </div>
    </div>
  )
}
