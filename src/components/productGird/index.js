import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductGrid.module.css';
import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useGlobalContext, actions } from '../../store';
import { BACK_END_URL } from '../../store/constants';
function ProductGrid() {
    const [state, dispatch] = useGlobalContext();
    const increment = useRef([1, 2, 3, 4, 5]);
    const [allowToCall, setAllowToCall] = useState(false);
    const [page, setPage] = useState(-1);
    const [pageData, setPageData] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [startPage, setStartPage] = useState(0);
    function disableAllButton() {
        const buttons = document.querySelectorAll('button');
        if (buttons.length > 0) {
            buttons.forEach((button) => {
                button.disabled = true;
            });
        }
    }
    function enableAllButton() {
        const buttons = document.querySelectorAll('button');
        if (buttons.length > 0) {
            buttons.forEach((button) => {
                button.disabled = false;
            });
        }
    }
    function previousPage() {
        if (page - 1 >= 0) {
            disableAllButton();
            if (startPage > page - 1) {
                setStartPage(page - 5);
            }
            setPage((prev) => {
                return prev - 1;
            });
        }
    }

    function nextPage() {
        disableAllButton();
        if (startPage + 4 < page + 1) {
            setStartPage(page + 1);
        }
        if (page + 1 < maxPage) {
            setPage((prev) => {
                return prev + 1;
            });
        }
    }

    function getData() {
        dispatch(actions.setWaitingStatus('block'));
        if (page > -1) {
            const api = axios.create({
                baseURL: BACK_END_URL,
            });
            api.get(state.page.dataUrl.data + page)
                .then((response) => {
                    setPageData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    dispatch(actions.setWaitingStatus('none'));
                });
        }
    }

    function getPageAmount() {
        dispatch(actions.setLoginStatus('block'));
        const api = axios.create({
            baseURL: BACK_END_URL,
        });
        api.get(state.page.dataUrl.pageAmount)
            .then((response) => {
                setMaxPage(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(actions.setWaitingStatus('none'));
            });
    }
    useEffect(() => {
        getPageAmount();
        setPage(0);
        setAllowToCall(!allowToCall);
    }, [state.page.dataUrl.data]);
    useEffect(() => {
        getData();
        enableAllButton();
    }, [page, allowToCall]);
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.title}>
                    <p>{state.page.title}</p>
                </div>
                <div className={styles.paging}>
                    <button className={styles.pageDirection} onClick={previousPage}>
                        &laquo;
                    </button>
                    {increment.current.map((value, index) => {
                        if (startPage + value > maxPage) {
                            return;
                        }
                        return (
                            <button
                                onClick={(e) => {
                                    disableAllButton();
                                    setPage(parseInt(e.target.value));
                                }}
                                key={index}
                                value={startPage + value - 1}
                                className={[styles.pageBtn, startPage + value - 1 == page ? styles.active : ''].join(
                                    ' ',
                                )}
                            >
                                {startPage + value}
                            </button>
                        );
                    })}

                    <button className={styles.pageDirection} onClick={nextPage}>
                        &raquo;
                    </button>
                </div>
            </div>
            <div className={styles.productGrid}>
                <ul>
                    {pageData.map((product) => (
                        <li className={styles.item} key={product['id']}>
                            <div className={styles.image}>
                                <img alt="" src={BACK_END_URL + '/' + product['images'][0]['src']}></img>
                            </div>
                            <div className={styles.name}>
                                <Link to={`/product?id=${product['id']}`}>{product['name']}</Link>
                                <div className={styles.rating}>
                                    {Array(product['rating'])
                                        .fill(1)
                                        .map((value, index) => (
                                            <span key={index}></span>
                                        ))}
                                </div>
                            </div>
                            <div className={styles.price}>
                                <Link to={`/product?id=${product['id']}`}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        product['types'][0]['price'],
                                    )}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.direction}>
                <button onClick={previousPage}>
                    <span>&laquo;</span>
                </button>
                <p>{page + 1}</p>
                <button onClick={nextPage}>
                    <span>&raquo;</span>
                </button>
            </div>
        </div>
    );
}

export default ProductGrid;
