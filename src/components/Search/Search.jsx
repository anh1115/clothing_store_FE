import React, { useState, useRef, useEffect } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from './Search.module.scss';
import ProductNew from '../ProductNew/ProductNew';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [totalResults, setTotalResults] = useState(0); // Thêm state để lưu tổng số kết quả
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const searchSuggestRef = useRef(null);
  const debounceTimeout = useRef(null);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (
      searchSuggestRef.current &&
      !searchSuggestRef.current.contains(event.target)
    ) {
      setKeyword("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword) {
      const fetchProducts = async () => {
        try {
          const response = await productApi.getProductByName(debouncedKeyword, 1); // Gọi API
          setResult(response.data.results || []);
          setTotalResults(response.data.count || 0); // Cập nhật tổng số kết quả
        } catch (error) {
          console.error("Error fetching related products:", error);
        }
      };

      fetchProducts();
    } else {
      setResult([]);
      setTotalResults(0); // Reset tổng số kết quả khi từ khóa bị xóa
    }
  }, [debouncedKeyword]);

  return (
    <>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Nhập từ khóa ..."
          value={keyword}
          onChange={handleInputChange}
        />
        <FaMagnifyingGlass />
      </div>
      {keyword && (
        <div className={styles.searchSuggest} ref={searchSuggestRef}>
          <div className="container">
            <div className="row">
              {totalResults === 0 ? (
                <div className={`${styles.noResults} col-lg-4`}>
                  <span>Không có sản phẩm nào.</span>
                </div>
              ) : (
                <div className={`${styles.result} col-lg-4 col-fix`}>
                  <span>Có <b>{totalResults}</b> sản phẩm</span>
                  <div className={styles.listResult}>
                    {result.slice(0, 3).map((product, index) => (
                      <div className={styles.cardProduct} key={product.id || index}>
                        <img
                          src={product.images && product.images.length > 0 ? `http://127.0.0.1:8000${product.images[0].url}` : ''}
                          alt={product.name}
                          loading="lazy"
                        />
                        <div className={styles.product_info}>
                          <Link to={`/product/${product.id}`} className={`${styles.productName} ${styles.title_ellipsis}`}>
                            {product.name}
                          </Link>
                          <span className={styles.price}>{parseFloat(product.sell_price).toLocaleString()}đ</span>
                        </div>
                      </div>
                    ))}
                    <div className={styles.see_more}>
                      <Link to={`/result/${debouncedKeyword}`}>Xem tất cả</Link>
                    </div>
                  </div>
                </div>
              )}
              <div className={`${styles.suggest} col-lg-8 col-fix`}>
                <ProductNew />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
