import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Btns from '../signbtninup';
import UserUI from '../userui';
import Navbar from '../nav';
import { useGlobalContext, actions } from '../../store';
import axios from 'axios';
import React, { useEffect } from 'react';
function Header() {
    const token = localStorage.getItem('accessToken');
    const [state, dispatch] = useGlobalContext();
    useEffect(() => {
        async function fetchData() {
            if (!token == '') {
                const api = axios.create({
                    baseURL: 'http://localhost:8080',
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
                let user_id;
                await api
                    .get(`/api/v1/user/get?token=${token}`)
                    .then((response) => {
                        user_id = response.data['id'];
                        dispatch(
                            actions.setLoginStatus({
                                cart: [],
                                status: true,
                                user: response.data,
                            }),
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                        localStorage.setItem('accessToken', '');
                    });
                api.get(`/api/v1/cart/get?id=${user_id}`)
                    .then((response) => {
                        dispatch(actions.addNewCartItem(response.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        fetchData();
    }, []);
    return (
        <header className={styles.container}>
            <div className={styles.title}>
                <img src="logo.png"></img>
                <Link to="/">Pii câu cá</Link>
            </div>
            <div className={styles.containerInput}>
                <input type="text" placeholder="Tìm kiếm" name="text" className={styles.input} />
                <svg
                    fill="#000000"
                    width="20px"
                    height="20px"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                        fillRule="evenodd"
                    ></path>
                </svg>
            </div>
            <div className={styles.userState}>{state.login.status ? <UserUI /> : <Btns />}</div>
            <Navbar />
        </header>
    );
}
export default Header;
