import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
// import './ProductDetailSlider.module.scss';

export default function ProductDetailSlider({images}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="product-detail-slider">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Pagination, Zoom, Thumbs]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-slider"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <img src={'http://127.0.0.1:8000' + src.url} alt={`Product ${index + 1}`} loading='lazy' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className="thumbnail-slider"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={'http://127.0.0.1:8000' + src.url} alt={`Thumbnail ${index + 1}`} loading='lazy' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
