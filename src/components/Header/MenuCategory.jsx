import React, { useEffect, useState } from 'react';
import styles from './MenuCategory.module.scss';
import { Col, Row } from 'react-bootstrap';
import CategoryApi from '../../api/categories';

export default function MenuCategory() {
    const [categories, setCategories] = useState([]);

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

    // Hàm render các danh mục con
    const renderSubCategories = (children) => {
        return children.map((child) => (
            <li key={child.category_id} className={styles.level2}>
                <a href={`/list-product/${child.category_id.toLowerCase()}`} title={child.name}>
                    {child.name}
                </a>
            </li>
        ));
    };

    return (
        <div className={`${styles.menuCategory}`}>
            <Row>
                <Col md={3}>
                    <img src="../mega1-1-image.webp" alt="image" loading='lazy' />
                </Col>
                <Col md={6}>
                    <ul className={styles.level0}>
                        {categories.map((category) => (
                            <li key={category.category_id} className={styles.level1} data-title={category.name} data-link={`/list-product/${category.category_id.toLowerCase()}`}>
                                <a className="hmega" href={`/list-product/${category.category_id.toLowerCase()}`} title={category.name}>
                                    {category.name}
                                </a>
                                {category.children.length > 0 && (
                                    <ul className={styles.listCategory}>
                                        {renderSubCategories(category.children)}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col md={3}>
                    <img src="../mega1-1-image.webp" alt="image" loading='lazy' />
                </Col>
            </Row>
        </div>  
    )
}
