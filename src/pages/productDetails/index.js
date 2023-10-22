import React, { useEffect, useState } from 'react';
import { actions, useGlobalContext } from '../../store';
import { BACK_END_URL } from '../../store/constants';
import styles from './ProductDetails.module.css';
import axios from 'axios';
import Header from '../../components/header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';

function ProductDetails() {
    const navigate = useNavigate();
    const [state, dispatch] = useGlobalContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(searchParams.get('id'));
    const [data, setData] = useState(null);
    const [relativeData, setRelativeData] = useState([]);
    const [mainImage, setMainImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedType, setSelectedType] = useState(0);
    const defaultAddress = '2 Võ Liêm Sơn, P.4, Q.8, Hồ Chí Minh';
    useEffect(() => {
        dispatch(actions.setWaitingStatus('block'));
        setId(searchParams.get('id'));
        setSelectedType(0);
        setQuantity(1);
    }, [searchParams.get('id')]);
    useEffect(() => {
        async function getData() {
            let tempData;
            await axios
                .get(BACK_END_URL + `/api/v1/product/get?id=${id}`)
                .then((response) => {
                    tempData = response.data;
                    setData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            if (tempData['subCategory']['id'] == 2) {
                axios
                    .get(
                        BACK_END_URL +
                            `/api/v1/product/category_with_limit?category=${tempData['category']['id']}&limit=6`,
                    )
                    .then((response) => {
                        setRelativeData(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        dispatch(actions.setWaitingStatus('none'));
                    });
            } else {
                axios
                    .get(
                        BACK_END_URL +
                            `/api/v1/product/sub_category_with_limit?sub_category=${tempData['subCategory']['id']}&limit=6`,
                    )
                    .then((response) => {
                        setRelativeData(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        dispatch(actions.setWaitingStatus('none'));
                    });
            }
        }
        getData();
    }, [id]);
    function renderMainImage() {
        if (data != null) {
            return <img alt="" src={BACK_END_URL + '/' + data['images'][mainImage]['src']}></img>;
        }
    }

    function renderThumbnails() {
        if (data != null) {
            let images = data['images'];
            return images.map((image, index) => (
                <div key={image['id']} className={mainImage == index ? styles.active : ''}>
                    <img
                        id={index}
                        alt=""
                        src={BACK_END_URL + '/' + image['src']}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            setMainImage(parseInt(e.target.id));
                        }}
                    ></img>
                </div>
            ));
        }
    }

    function renderDescriptions() {
        if (data != null) {
            let descriptions = data['descriptions'];
            return descriptions.map((description) => (
                <div key={description['id']} id={description['id']}>
                    <img
                        alt=""
                        src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                    ></img>
                    {description['content'].charAt(0).toUpperCase() + description['content'].slice(1)}
                </div>
            ));
        }
    }

    function renderInfor(flag) {
        if (data != null) {
            switch (flag) {
                case 'brand': {
                    return (
                        <p>{`Thương hiệu: ${
                            data['brand']['name'].charAt(0).toUpperCase() + data['brand']['name'].slice(1)
                        }`}</p>
                    );
                }
                case 'name': {
                    return <p>{data['name']}</p>;
                }
                case 'rating': {
                    return Array(data['rating'])
                        .fill(1)
                        .map((value, index) => <span key={index}></span>);
                }
                case 'price': {
                    return (
                        <p>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                data['types'][0]['price'],
                            )}
                        </p>
                    );
                }
                case 'address': {
                    if (state.login.status != false && state.login.user != null) {
                        return <p>{`Giao đến ${state.login.user.address}`}</p>;
                    } else {
                        return <p>{`Giao đến ${defaultAddress}`}</p>;
                    }
                }
                case 'type': {
                    const types = data['types'];
                    return types.map((type, index) => (
                        <div key={type['id']}>
                            <input
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                }}
                                checked={index == selectedType ? true : false}
                                type="radio"
                                name="choice"
                                value={index}
                                id={type['id']}
                            />
                            <label htmlFor={type['id']}>{type['type']}</label>
                        </div>
                    ));
                }
                case 'maxQuantity': {
                    return <p>{`Số lượng hiện có: ${data['types'][selectedType]['quantity']}`}</p>;
                }
                case 'total': {
                    return (
                        <p>
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(data['types'][parseInt(selectedType)]['price'] * quantity)}
                        </p>
                    );
                }
            }
        }
    }
    return (
        <React.Fragment>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.images}>
                    <div className={styles.mainImage}>{renderMainImage()}</div>
                    <div className={styles.thumbnails}>{renderThumbnails()}</div>
                    <div className={styles.descriptions}>
                        <div>Đặc điểm nổi bật</div>
                        {renderDescriptions()}
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.infor}>
                        <div className={styles.brand}>{renderInfor('brand')}</div>
                        <div className={styles.name}>{renderInfor('name')}</div>
                        <div className={styles.rating}>{renderInfor('rating')}</div>
                        <div className={styles.price}>{renderInfor('price')}</div>
                    </div>
                    <div className={styles.transport}>
                        <p>Thông tin vận chuyển</p>
                        {renderInfor('address')}
                        <div className={styles.protocol}>
                            <div className={styles.item}>
                                <p>
                                    <img src="https://salt.tikicdn.com/ts/upload/04/da/1e/eac32401f048ffd380e50dfeda2a1c55.png"></img>
                                    Giao siêu tốc 2h
                                </p>
                                <p>
                                    Trước 10h ngày mai:{' '}
                                    <span>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            25000,
                                        )}
                                    </span>
                                </p>
                            </div>
                            <div className={styles.item}>
                                <p>
                                    <img src="https://salt.tikicdn.com/ts/upload/6b/59/d9/783a8f53f8c251dbe5f644df40c21c15.png"></img>
                                    Giao đúng chiều mai
                                </p>
                                <p>
                                    13h-18h ngày mai:{' '}
                                    <span>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            25000,
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.relativeProduct}>
                        <p>Sản phẩm tương tự</p>
                        <div className={styles.productGrid}>
                            <ul>
                                {relativeData.map((product) => (
                                    <li className={styles.item} key={product['id']}>
                                        <div className={styles.image}>
                                            <img alt="" src={BACK_END_URL + '/' + product['images'][0]['src']}></img>
                                        </div>
                                        <div className={styles.name}>
                                            <Link to={`/product?id=${product['id']}`}>{product['name']}</Link>
                                        </div>
                                        <div className={styles.price}>
                                            <Link to={`/product?id=${product['id']}`}>
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(product['types'][0]['price'])}
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.types}>
                    <div>
                        <p>Loại sản phẩm </p>
                        <div className={styles.choices}>{renderInfor('type')}</div>
                    </div>
                    <div>
                        <div className={styles.quantity}>
                            <div>
                                <p>Số lượng</p>
                                {renderInfor('maxQuantity')}
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        if (quantity > 1) {
                                            setQuantity((prev) => {
                                                return prev - 1;
                                            });
                                        }
                                    }}
                                >
                                    -
                                </button>
                                <input
                                    value={quantity}
                                    onChange={(e) => {
                                        if (e.target.value < data['types'][selectedType]['quantity']) {
                                            setQuantity(e.target.value);
                                        } else {
                                            setQuantity(7);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        if (quantity < data['types'][selectedType]['quantity']) {
                                            setQuantity((prev) => {
                                                return prev + 1;
                                            });
                                        }
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={styles.total}>
                            <p>Tạm tính</p>
                            {renderInfor('total')}
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.pay}>Mua ngay</button>
                            <button
                                className={styles.addToCart}
                                onClick={() => {
                                    if (!state['login']['status']) {
                                        navigate('/login', { replace: true });
                                    } else {
                                        let newItem = {};
                                        newItem['id'] = '';
                                        newItem['image'] = data['images'][0]['src'];
                                        newItem['product_name'] = data['name'];
                                        newItem['product_id'] = data['id'];
                                        newItem['type_name'] = data['types'][selectedType]['type'];
                                        newItem['type_id'] = data['types'][selectedType]['id'];
                                        newItem['quantity'] = quantity;
                                        newItem['amount'] = quantity * data['types'][selectedType]['price'];
                                        let flag = true;
                                        let newCartList = state['login']['cart'];
                                        newCartList.forEach((value) => {
                                            if (value['type_id'] == newItem['type_id']) {
                                                value['quantity'] += newItem['quantity'];
                                                value['amount'] += newItem['amount'];
                                                flag = false;
                                            }
                                        });
                                        if (flag) {
                                            newCartList.push(newItem);
                                        }
                                        const token = localStorage.getItem('accessToken');
                                        const api = axios.create({
                                            baseURL: BACK_END_URL,
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
                                        api.post('/api/v1/cart/update', {
                                            user_id: state['login']['user']['id'],
                                            carts: newCartList,
                                        })
                                            .then((response) => {
                                                dispatch(actions.addNewCartItem(response.data));
                                            })
                                            .then(() => {
                                                dispatch(
                                                    actions.setNotify({
                                                        display: 'block',
                                                        type: 'success',
                                                        content: 'Thêm vào giỏ hàng thành công.',
                                                    }),
                                                );
                                            })
                                            .catch((error) => {
                                                dispatch(
                                                    actions.setNotify({
                                                        display: 'block',
                                                        type: 'error',
                                                        content: 'Thêm vào giỏ hàng không thành công.',
                                                    }),
                                                );
                                            });
                                    }
                                }}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>
    );
}

export default ProductDetails;
