import styles from './UserUi.module.css';
import { useState } from 'react';
import axios from 'axios';
import { BACK_END_URL, BACK_END_URL as baseURL } from '../../store/constants';
import { Link, useNavigate } from 'react-router-dom';
import { actions, useGlobalContext } from '../../store';
function UserUI() {
    const navigate = useNavigate();
    const [state, dispatch] = useGlobalContext();
    const [inforDisplay, setInforDisplay] = useState('none');
    const [cartDisplay, setCartDisplay] = useState('none');
    function logoutHandler(e) {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        const api = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        api.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error) => {
                Promise.reject(error);
            },
        );
        api.post('/api/v1/auth/logout')
            .then((response) => {
                localStorage.setItem('accessToken', '');
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(
                            actions.setCurrentPage({
                                type: 'product',
                                title: 'sản phẩm nổi bật',
                                dataUrl: {
                                    pageAmount: '/api/v1/product/page_amount',
                                    data: '/api/v1/product/get_page?page=',
                                },
                            }),
                        );
                        navigate('/', { replace: true });
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                        strokeWidth="0"
                        fill="currentColor"
                        stroke="currentColor"
                        className={styles.icon}
                    >
                        <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                    </svg>
                </button>

                <button
                    className={styles.button}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (inforDisplay === 'none') {
                            setCartDisplay('none');
                            setInforDisplay('flex');
                        } else {
                            setInforDisplay('none');
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        strokeWidth="0"
                        fill="currentColor"
                        stroke="currentColor"
                        className={styles.icon}
                    >
                        <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
                    </svg>
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (cartDisplay === 'none') {
                            setInforDisplay('none');
                            setCartDisplay('flex');
                        } else {
                            setCartDisplay('none');
                        }
                    }}
                    className={styles.button}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                        className={styles.icon}
                    >
                        <circle r="1" cy="21" cx="9"></circle>
                        <circle r="1" cy="21" cx="20"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </button>
            </div>
            <div
                style={{
                    display: inforDisplay,
                }}
                className={styles.userMenu}
            >
                <span className={styles.loader}></span>
                <p className={styles.username}>{state.login.user.username}</p>
                <p className={styles.email}>{state.login.user.email}</p>
                <button className={styles.btn}>
                    Xem thông tin
                    <span></span>
                </button>
                <a onClick={logoutHandler}>Đăng xuất</a>
            </div>
            <div
                className={styles.cart}
                style={{
                    display: cartDisplay,
                }}
            >
                {state['login']['cart'].map((cart, index) => (
                    <div key={index} className={styles.cartItem}>
                        <div>
                            <img
                                alt={BACK_END_URL + '/' + cart['image']}
                                src={BACK_END_URL + '/' + cart['image']}
                            ></img>
                        </div>
                        <div>
                            {' '}
                            <p>
                                {cart['product_name'].charAt(0).toUpperCase() +
                                    cart['product_name'].slice(1).toLowerCase()}
                            </p>
                            <div>
                                <p>
                                    {`Loại: ${
                                        cart['type_name'].charAt(0).toUpperCase() +
                                        cart['type_name'].slice(1).toLowerCase()
                                    }`}
                                </p>
                                <p>{`Số lượng: ${cart['quantity']}`}</p>
                            </div>
                        </div>
                        <div>
                            {' '}
                            <p>{`Thành tiền: ${new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(cart['amount'])}`}</p>
                        </div>
                    </div>
                ))}
                <div className={styles.goToCartDetails}>
                    <Link to={`/cart/details`}>Chi tiết giỏ hàng</Link>
                </div>
            </div>
        </div>
    );
}

export default UserUI;
