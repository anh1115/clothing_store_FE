import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { toast } from 'react-toastify';

function FormReview({ product_id, onReviewSubmit }) {
  const [rating, setRating] = useState(0); // Số sao người dùng chọn
  const [hover, setHover] = useState(0); // Hiệu ứng hover khi di chuột
  const [content, setContent] = useState(""); // Nội dung review

  // Hàm lấy token từ localStorage
  const getToken = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo)?.token : null;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      const response = await fetch("http://127.0.0.1:8000/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          product_id: product_id,
          rating: rating,
          comment: content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit review: ${response.status}`);
      }
      toast.success("Gửi đánh giá thành công!");
      onReviewSubmit();
      // Reset form sau khi gửi
      setRating(0);
      setContent("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Có lỗi xảy ra khi gửi đánh giá!");
    }
  };

  return (
    <div className="p-4 border rounded bg-light">
      <Form onSubmit={handleSubmit}>
        {/* Chọn số sao */}
        <Form.Group className="mb-3">
          <Form.Label>Số sao</Form.Label>
          <div>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={30}
                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                    style={{ cursor: "pointer", transition: "color 200ms" }}
                  />
                </label>
              );
            })}
          </div>
        </Form.Group>

        {/* Nội dung đánh giá */}
        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Nhập nội dung đánh giá của bạn"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        {/* Nút gửi */}
        <button type="submit">
          Gửi đánh giá
        </button>
      </Form>
    </div>
  );
}

export default FormReview;