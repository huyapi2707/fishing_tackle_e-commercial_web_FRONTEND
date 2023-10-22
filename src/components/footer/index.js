import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import CopyRight from '../copyrightFooter';
import React from 'react';
function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.topFooter}>
                <p>PII INC.</p>
            </div>
            <div className={styles.bodyFooter}>
                <div className={[styles.section, styles.section1].join(' ')}>
                    <p>pii câu cá</p>
                    <p>Cửa hàng dụng cụ câu cá Pii</p>
                    <p>Địa chỉ: Ấp An Lợi - Đông Hòa Hiệp - Cái Bè - Tiền Giang </p>
                    <p>Hotline: 0789.640.313</p>
                    <p>
                        Chuyên cung cấp sỉ và lẻ các loại cần câu, máy câu, dây câu, lưỡi, phao, mồi và phụ kiện đi câu
                        chính hãng.
                    </p>
                </div>
                <div className={[styles.section, styles.section2].join(' ')}>
                    <p>giấy phép kinh doanh</p>
                    <p>Giấy chứng nhận kinh doanh số: 0094549522</p>
                    <p>Ngày cấp: ngày 27 tháng 07 năm 2023</p>
                    <p>Chủ sở hữu: Pii Inc.</p>
                    <Link>
                        <p>
                            <i className="fa-solid fa-tag"></i> Chính sách bảo mật
                        </p>
                    </Link>
                    <Link>
                        <p>
                            <i className="fa-solid fa-tag"></i> Chính sách thanh toán và giao hàng
                        </p>
                    </Link>

                    <Link>
                        <p>
                            <i className="fa-solid fa-tag"></i> Chính sách bảo hành, đổi trả, hoàn tiền
                        </p>
                    </Link>
                </div>
                <div className={styles.section}>
                    <p>Mạng xã hội</p>
                    <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100094019557560&tabs=timeline&width=400&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="400"
                        height="100%"
                        style={{ overflow: 'hiden', border: 'none   ' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                </div>
                <div className={styles.section}>
                    <p>Map</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.5587541065552!2d106.01662518869934!3d10.34648724226058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a9b08a435f9bd%3A0xa41fc7d9b1ae91dc!2zQ2FmZSBWxrDhu51uIFhvw6Bp!5e0!3m2!1svi!2s!4v1687361505891!5m2!1svi!2s"
                        width="400"
                        height="100%"
                        style={{ border: '0' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <CopyRight />
        </footer>
    );
}

export default React.memo(Footer);
