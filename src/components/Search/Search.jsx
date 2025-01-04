import React, { useState, useRef, useEffect } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from './Search.module.scss';
import ProductNew from '../ProductNew/ProductNew';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState(""); // Lưu từ khóa đã debounce
  const searchSuggestRef = useRef(null);
  const debounceTimeout = useRef(null); // Lưu timeout để hủy khi nhập lại

  const handleInputChange = (event) => {
    setKeyword(event.target.value); // Cập nhật từ khóa
  };

  const handleClickOutside = (event) => {
    if (
      searchSuggestRef.current &&
      !searchSuggestRef.current.contains(event.target)
    ) {
      // Nếu click ra ngoài searchSuggest
      setKeyword(""); // Ẩn searchSuggest
    }
  };

  useEffect(() => {
    // Gắn sự kiện click trên document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup khi component bị unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Debounce: Khi từ khóa thay đổi, delay 2s rồi update `debouncedKeyword`
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Xóa timeout cũ nếu người dùng nhập lại
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedKeyword(keyword); // Cập nhật từ khóa đã debounce sau 2s
    }, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current); // Cleanup timeout khi component unmount
      }
    };
  }, [keyword]);

  useEffect(() => {
    // Khi debouncedKeyword thay đổi, gọi API (hoặc xử lý với từ khóa đã debounce)
    if (debouncedKeyword) {
      // Call API ở đây
      const fetchProducts = async (debouncedKeyword) => {
        try {
          const response = await productApi.getProductByName(debouncedKeyword); // API lấy danh sách sản phẩm
          setResult(response.data); // Cập nhật state sản phẩm
        } catch (error) {
          console.error("Error fetching related products:", error);
        }
      };

      fetchProducts(debouncedKeyword);

    }
  }, [debouncedKeyword]); // Gọi API khi debouncedKeyword thay đổi

  return (
    <>
      <div className={styles.searchForm}>
        <input type="text" placeholder='Nhập từ khóa ...'
          value={keyword}
          onChange={handleInputChange} />
        <FaMagnifyingGlass />
      </div>
      {keyword && (
        <div className={styles.searchSuggest} ref={searchSuggestRef}>
          <div className="container">
            <div className='row'>
              {result.length == 0 ? (
                <div className={`${styles.noResults} col-lg-4`}>
                  <span>Không có sản phẩm nào.</span>
                </div>
              ) : (
                <div className={`${styles.result} col-lg-4 col-fix`}>
                  <span>Có <b>{result.length}</b> sản phẩm</span>
                  <div className={styles.listResult}>
                    {result.slice(0, 4).map((product, index) => (
                      <div className={styles.cardProduct} key={index}>
                        <img src={product.images && product.images.length > 0 ? 'http://127.0.0.1:8000' + product.images[0].url : ''} alt={product.name} loading='lazy' />
                        <div className={styles.product_info}>
                          <Link to={''} className={`${styles.productName} ${styles.title_ellipsis}`}>{product.name}</Link>
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
              <div className={`{styles.suggest} col-lg-8 col-fix`}>
                <ProductNew />
              </div>
            </div>
          </div>
        </div >
      )
      }
    </>
  )
}
