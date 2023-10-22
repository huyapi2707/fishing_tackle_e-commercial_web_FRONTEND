import styles from './Navbar.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACK_END_URL as baseURL } from '../../store/constants';
import { useGlobalContext } from '../../store';
import { actions } from '../../store';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [state, dispatch] = useGlobalContext();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${baseURL}/api/v1/product/brand/getAllName`)
            .then((response) => {
                setBrands(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(`${baseURL}/api/v1/product/category/getCategoryAndSubtype`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    function disableAllButton() {
        const buttons = document.querySelectorAll('button');
        if (buttons.length > 0) {
            buttons.forEach((button) => {
                button.disabled = true;
            });
        }
    }
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <button>giới thiệu</button>
                </li>
                <li>
                    <button>sản phẩm</button>
                    <ul className={styles.sublist}>
                        {categories.map((value) => (
                            <li key={value.id}>
                                <button
                                    id={value.id}
                                    value={value.name}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        disableAllButton();
                                        dispatch(
                                            actions.setCurrentPage({
                                                type: 'product',
                                                title: `sản phẩm ${e.target.value}`,
                                                dataUrl: {
                                                    pageAmount: `/api/v1/product/category/page_amount?id=${e.target.id}`,
                                                    data: `/api/v1/product/category?category=${e.target.id}&page=`,
                                                },
                                            }),
                                        );
                                        if (window.location.href != 'http://localhost:3000/') {
                                            navigate('/', { replace: true });
                                        }
                                    }}
                                >
                                    {value.name}
                                </button>
                                <ul className={styles.sublist}>
                                    {value.subtypes.map((subtype) => (
                                        <li key={subtype.id}>
                                            <button
                                                id={subtype.id}
                                                value={`${value.name}-${subtype.name}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    disableAllButton();
                                                    dispatch(
                                                        actions.setCurrentPage({
                                                            type: 'product',
                                                            title: `sản phẩm ${e.target.value}`,
                                                            dataUrl: {
                                                                pageAmount: `/api/v1/product/subtype/page_amount?id=${e.target.id}`,
                                                                data: `/api/v1/product/sub_category?sub_category=${e.target.id}&page=`,
                                                            },
                                                        }),
                                                    );
                                                    if (window.location.href != 'http://localhost:3000/') {
                                                        navigate('/', {
                                                            replace: true,
                                                        });
                                                    }
                                                }}
                                            >
                                                {subtype.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <button>thương hiệu</button>
                    <ul className={styles.sublist}>
                        {brands.map((value) => (
                            <li key={value.id}>
                                <button
                                    id={value.id}
                                    value={value.name}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        disableAllButton();
                                        dispatch(
                                            actions.setCurrentPage({
                                                type: 'product',
                                                title: `sản phẩm thương hiệu ${e.target.value}`,
                                                dataUrl: {
                                                    pageAmount: `/api/v1/product/brand/page_amount?id=${e.target.id}`,
                                                    data: `/api/v1/product/brand?brand=${e.target.id}&page=`,
                                                },
                                            }),
                                        );
                                        if (window.location.href != 'http://localhost:3000/') {
                                            navigate('/', { replace: true });
                                        }
                                    }}
                                >
                                    {value.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <button>chính sách bán hàng</button>
                </li>
                <li>
                    <button>liên hệ</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
