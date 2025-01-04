import { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import productApi from '../../api/productApi';

function Banner() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await productApi.getBanner(); // Gọi API
                setBanners(response.data); // Cập nhật state với dữ liệu từ API
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanner(); // Thực hiện gọi hàm khi component được render
    }, []);

    return (
        <Carousel>
            {banners.map((banner) => (
                <Carousel.Item interval={2000} key={banner.banner_id}>
                    <Image src={'http://127.0.0.1:8000' + banner.image} alt='banner' />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Banner;