import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Button, Pagination } from 'react-bootstrap';

function ListReview({ product_id }) {
    const [reviews, setReviews] = useState([]); // Lưu trữ danh sách đánh giá
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang

    // Hàm lấy token từ localStorage
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo)?.token : null;
    };

    // Lấy dữ liệu đánh giá từ API
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = getToken();
                const response = await fetch(
                    `http://127.0.0.1:8000/api/reviews/product/${product_id}/?page=${currentPage}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json", // Dữ liệu kiểu JSON
                            "Authorization": `Token ${token} `, // Thêm token vào header
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
                }

                const data = await response.json();
                setReviews(data.results); // Cập nhật state với danh sách đánh giá từ API
                setTotalPages(data.total_pages); // Cập nhật tổng số trang
            } catch (err) {
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };

        fetchReviews();
    }, [product_id, currentPage]); // Fetch lại khi product_id hoặc currentPage thay đổi

    // Hàm thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4 border rounded bg-light mt-4">
            <h4 className="mb-4 fw-bold">Đánh giá</h4>

            {loading ? (
                <p>Đang tải đánh giá...</p>
            ) : (
                <>
                    {reviews.length === 0 ? ( // Kiểm tra nếu không có đánh giá nào
                        <p className="text-muted">Hiện chưa có đánh giá</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.review_id} className="mb-3 border-bottom pb-2">
                                {/* Tên người đánh giá */}
                                <h6 className="mb-1 fw-bold">{review.full_name}</h6>

                                {/* Số sao */}
                                <div className="mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            size={20}
                                            color={index < review.rating ? '#ffc107' : '#e4e5e9'} // Sao vàng hoặc xám
                                        />
                                    ))}
                                </div>

                                {/* Nội dung đánh giá */}
                                <p className="mb-0">{review.comment}</p>
                            </div>
                        ))
                    )}
                    {reviews.length > 0 && totalPages > 1 && (
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    )}
                </>
            )
            }
        </div >
    );
}

export default ListReview;
