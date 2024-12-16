import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Faq() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    return (
        <div className='container'>
            <Helmet>
                <title>Hỏi đáp - {appName}</title>
            </Helmet>
            {/* Hỏi đáp về tài khoản */}
            <div className="accordion mt-3" id="faqAccount">
                <h3 className="mb-3">Hỏi đáp về tài khoản</h3>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faqAccountOne"
                            aria-expanded="true"
                            aria-controls="faqAccountOne"
                        >
                            1. Làm thế nào để tôi trở thành thành viên?
                        </button>
                    </h2>
                    <div id="faqAccountOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccount">
                        <div className="accordion-body">
                            Quý khách vui lòng nhấn vào nút “Đăng ký” ở thanh menu trên cùng của màn hình (Đối với Desktop) hoặc tại góc trái màn hình, chọn biểu tượng Menu rồi chọn “Đăng ký” (Đối với Mobile).
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fw-bold collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faqAccountTwo"
                            aria-expanded="false"
                            aria-controls="faqAccountTwo"
                        >
                            2. Tại sao tôi không thể đăng nhập vào tài khoản của tôi?
                        </button>
                    </h2>
                    <div id="faqAccountTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccount">
                        <div className="accordion-body">
                            Quý khách vui lòng kiểm tra kỹ về kiểu gõ hoặc phím Caps Lock/ IN HOA trong quá trình điền thông tin đăng nhập thành viên, trường hợp không thể đăng nhập thành công quý khách vui lòng chọn nút “Quên mật khẩu” ngay dưới ô mật khẩu và nhập email đã đăng ký.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fw-bold collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faqAccountThree"
                            aria-expanded="false"
                            aria-controls="faqAccountThree"
                        >
                            3. Tôi có thể sử dụng chung tài khoản với người khác được không?
                        </button>
                    </h2>
                    <div id="faqAccountThree" className="accordion-collapse collapse" data-bs-parent="#faqAccount">
                        <div className="accordion-body">
                            Quý khách nên sử dụng tài khoản cá nhân để đảm bảo độ tin cậy cũng như quyền lợi của bản thân khi mua sắm. Việc sử dụng chung tài khoản có thể dẫn đến những sai sót mà người chịu ảnh hưởng trực tiếp chính là quý khách hàng.
                        </div>
                    </div>
                </div>
            </div>

            {/* Hỏi đáp về đặt hàng */}
            <div className="accordion mt-3" id="faqOrder">
                <h3 className="mb-3">Hỏi đáp về đặt hàng</h3>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faqOrderOne"
                            aria-expanded="true"
                            aria-controls="faqOrderOne"
                        >
                            1. Tôi có thể đặt hàng bằng những hình thức nào?
                        </button>
                    </h2>
                    <div id="faqOrderOne" className="accordion-collapse collapse show" data-bs-parent="#faqOrder">
                        <div className="accordion-body">
                            Quý khách có thể mua hàng tại Dola bằng những hình thức sau:
                            <ul>
                                <li>Đặt hàng trực tuyến tại website</li>
                                <li>Đặt hàng trực tiếp với tư vấn viên qua Hotline 1900 6750</li>
                                <li>Đặt hàng trực tuyến trên các sàn thương mại điện tử</li>
                                <li>Mua hàng trực tiếp tại các hệ thống cửa hàng</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fw-bold collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faqOrderTwo"
                            aria-expanded="false"
                            aria-controls="faqOrderTwo"
                        >
                            2. Tôi cần hỗ trợ mua hàng, làm cách nào để liên hệ với tư vấn viên?
                        </button>
                    </h2>
                    <div id="faqOrderTwo" className="accordion-collapse collapse" data-bs-parent="#faqOrder">
                        <div className="accordion-body">
                            Để liên hệ với nhân viên tư vấn, quý khách vui lòng liên hệ qua Hotline 1900 6750 trong thời gian từ 9:00 – 18:00, T2 – T6 hằng tuần.
                        </div>
                    </div>
                </div>
            </div>

            {/* Hỏi đáp về giao hàng */}
            <div className="accordion mt-3" id="faqShipping">
                <h3 className="mb-3">Hỏi đáp về giao hàng</h3>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faqShippingOne"
                            aria-expanded="true"
                            aria-controls="faqShippingOne"
                        >
                            1. Tôi không ở Hồ Chí Minh, Dola có hỗ trợ giao hàng không?
                        </button>
                    </h2>
                    <div id="faqShippingOne" className="accordion-collapse collapse show" data-bs-parent="#faqShipping">
                        <div className="accordion-body">
                            Chúng tôi áp dụng giao hàng trên toàn quốc cho tất cả giá trị đơn hàng. Phí vận chuyển và thời gian giao hàng sẽ thay đổi tùy thuộc vào giá trị đơn hàng và từng khu vực cụ thể.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
