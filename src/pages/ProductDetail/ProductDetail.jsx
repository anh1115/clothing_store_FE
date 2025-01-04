import React, { useState, useEffect } from 'react'; // import useState, useEffect
import { Helmet } from 'react-helmet-async';
import { Button, Col, Row } from 'react-bootstrap';
import styles from './ProductDetail.module.scss';
import { Link, useParams } from 'react-router-dom';
import QuantityPicker from '../../components/QuantityPicker/QuantityPicker';
import ProductDetailSlider from './ProductDetailSlider';
import ProductDetailTabs from './ProductDetailTabs';
import productApi from '../../api/productApi';
import ProductColors from './ProductColors';
import ProductSizes from './ProductSizes';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import CategoryApi from '../../api/categories';
import { useCart } from '../../components/Contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null); // Khởi tạo state để lưu thông tin sản phẩm
    const [productRelate, setProductRelate] = useState([]); // Danh sách sản phẩm liên quan
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantityStock, setQuantityStock] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.getById(id); // Gọi API với id sản phẩm
                setProduct(response.data); // Cập nhật state với dữ liệu sản phẩm
                setSelectedColor(response.data.colors[0]);
                setSelectedSize(response.data.sizes[0]);

                // Gọi API sản phẩm liên quan với product_id
                await fetchRelatedProducts(response.data.product_id);
            } catch (error) {
                console.error('Error fetching Product:', error);
            } finally {
                setLoading(false); // Set loading thành false sau khi hoàn thành
            }
        };

        const fetchRelatedProducts = async (productId) => {
            try {
                const response = await productApi.getRelatedProducts(productId); // API lấy danh sách sản phẩm liên quan
                setProductRelate(response.data); // Cập nhật state sản phẩm liên quan
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        fetchProduct(); // Gọi hàm lấy dữ liệu khi component render
    }, [id]); // Chạy lại khi id thay đổi

    if (loading) {
        return <div className='container'>Loading...</div>; // Hiển thị khi đang tải dữ liệu
    }

    if (!product) {
        return <div>Product not found</div>; // Hiển thị khi không tìm thấy sản phẩm
    }

    const isOutOfStock = product.stock_quantities.length === 0;

    const isOutOfStocks = (color, size) => {
        const colorStock = product.stock_quantities.find(
            stock => stock.color.color_id === color.color_id && stock.size.size_id === size.size_id
        );
        // Kiểm tra nếu không tìm thấy hoặc số lượng bằng 0
        if (!colorStock || colorStock.stock <= 0) {
            alert("Sản phẩm với màu sắc và kích thước đã chọn hiện không còn hàng.");
            setQuantityStock(1);
            return true; // Hết hàng
        }

        // Còn hàng, cập nhật số lượng tồn kho
        setQuantityStock(colorStock.stock || 1);
        return false; // Còn hàng
    };

    const handleAddToCart = () => {
        // Kiểm tra nếu sản phẩm với màu sắc và kích thước đã chọn còn hàng
        if (isOutOfStocks(selectedColor, selectedSize)) {
            return;
        } else if (quantityStock < quantity) {
            alert("Số lượng sản phẩm còn lại không đủ.");
            return;
        }
        // Lấy các thông tin cần thiết để thêm sản phẩm vào giỏ
        const productData = {
            id: product.product_id,
            color_id: selectedColor.color_id, // Sử dụng màu sắc đã chọn
            size_id: selectedSize.size_id, // Sử dụng kích thước đã chọn
            quantity: quantity
        };

        addToCart(productData); // Gọi hàm addToCart
    };

    const handleBuyNow = () => {
        // Kiểm tra nếu sản phẩm với màu sắc và kích thước đã chọn còn hàng
        if (isOutOfStocks(selectedColor, selectedSize)) {
            alert("Sản phẩm với màu sắc và kích thước đã chọn hiện không còn hàng.");
            return;
        }
        if (!isOutOfStock) {
            sessionStorage.removeItem('selectedProducts');
            // Tạo một mảng chứa thông tin sản phẩm đã chọn
            const selectedProduct = {
                product_id: product.product_id,
                product_name: product.name,
                first_image_url: product.images[0].url,
                product_sell_price: product.sell_price * 1,
                quantity: quantity,
                color_id: selectedColor ? selectedColor.color_id : 'Màu mặc định',
                color_name: selectedColor ? selectedColor.name : 'Màu mặc định',
                size_id: selectedSize ? selectedSize.size_id : 'Kích thước mặc định',
                size_name: selectedSize ? selectedSize.name : 'Kích thước mặc định',
                subtotal: (product.sell_price * quantity),
            };

            // Lưu thông tin sản phẩm vào sessionStorage hoặc gửi qua state của navigate
            sessionStorage.setItem('selectedProducts', JSON.stringify([selectedProduct]));
            // Chuyển hướng đến trang checkout
            navigate('/checkout');
        }
    };

    return (
        <div className='container mt-3'>
            <Helmet>
                <title>{product.name} - {appName}</title> {/* Set title với tên sản phẩm */}
            </Helmet>
            <Row>
                <Col md={5} xs={12}>
                    <ProductDetailSlider images={product.images} />
                </Col>
                <Col md={7} xs={12}>
                    <h2 className={styles.product_name}>{product.name}</h2>
                    <div>
                        <div className={styles.inventory_quantity}>
                            <div>
                                <span>Loại: </span>
                                <span className={styles.vendor}>{product.categories[0].name}</span> {/* Hiển thị loại */}
                            </div>
                            <div>
                                <span>Mã Sản Phẩm: </span>
                                <span className={styles.vendor}>{product.product_id}</span> {/* Hiển thị mã sản phẩm */}
                            </div>
                            <div>
                                <span>Tình Trạng: </span>
                                <span className={styles.vendor}>{isOutOfStock ? "Hết hàng" : "Còn hàng"}</span> {/* Hiển thị tình trạng */}
                            </div>
                        </div>
                        <div className={styles.price_box}>
                            <span className={styles.title_price}>Giá bán: </span>
                            <span className={styles.special_price}>{parseFloat(product.sell_price).toLocaleString()}đ</span> {/* Hiển thị giá sản phẩm */}
                        </div>
                    </div>
                    <div>
                        <ProductColors product={product} selectedColor={selectedColor} onColorSelect={setSelectedColor} />
                        <ProductSizes product={product} selectedSize={selectedSize} onSizeSelect={setSelectedSize} />
                    </div>
                    <div className={styles.quantity}>
                        <Row className='align-items-end'>
                            <Col>
                                <span>Số lượng:</span>
                                <QuantityPicker value={quantity} onChange={setQuantity} /> {/* Picker để chọn số lượng */}
                            </Col>
                            <Col>
                                <button disabled={isOutOfStock} onClick={handleAddToCart}>Thêm vào giỏ</button> {/* Nút thêm vào giỏ */}
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.group_button}>
                        <button onClick={handleBuyNow} disabled={isOutOfStock}>Mua ngay</button>
                        <Link to={'/contact'}>
                            <button>Liên hệ</button>
                        </Link>
                    </div>
                    <div className={styles.box_camket}>
                        <span className={styles.title}>Cam kết của chúng tôi</span>
                        <div className={styles.camket}>
                            <ul>
                                {/* Hiển thị các cam kết */}
                                <li>
                                    <img src='../camket_1.png' alt='CamKet' loading='lazy' />
                                    <span>Cam kết 100% chính hãng</span>
                                </li>
                                <li>
                                    <img src='../camket_2.webp' alt='CamKet' loading='lazy' />
                                    <span>Hoàn tiền 111% nếu hàng kém chất lượng</span>
                                </li>

                                <li>
                                    <img src='../camket_3.webp' alt='CamKet' loading='lazy' />
                                    <span>Giao tận tay khách hàng</span>
                                </li>
                                <li>
                                    <img src='../camket_4.webp' alt='CamKet' loading='lazy' />
                                    <span>Mở hộp kiểm tra nhận hàng</span>
                                </li>
                                <li>
                                    <img src='../camket_5.webp' alt='CamKet' loading='lazy' />
                                    <span>Hỗ trợ 24/7</span>
                                </li>
                                <li>
                                    <img src='../camket_6.webp' alt='CamKet' loading='lazy' />
                                    <span>Đổi trả trong 7 ngày</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className='mt-3'>
                <ProductDetailTabs description={product.description} product_id={product.product_id} />
            </div>
            <div className='mt-3'>
                <h2>Sản phẩm liên quan</h2>
                <ProductSlider products={productRelate} />
            </div>
        </div>
    );
}
