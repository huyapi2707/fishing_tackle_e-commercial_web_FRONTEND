import styles from './Login.module.css';
import validator from 'validator';
import axios from 'axios';
import { useGlobalContext, actions } from '../../store';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, Link, unstable_HistoryRouter } from 'react-router-dom';
import { BACK_END_URL as baseUrl } from '../../store/constants';
import Copyright from '../../components/copyrightFooter';

function LoginForm() {
    const [state, dispatch] = useGlobalContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (state.login.status) {
            navigate('/', { replace: false });
        }
    }, [state.login.status]);
    function vibrateForm(formClass) {
        let form = document.querySelector(`.${formClass}`);
        if (form.classList.contains(styles.vibrate)) {
            form.classList.remove(styles.vibrate);
        }
        setTimeout(() => {
            form.classList.add(styles.vibrate);
        }, 0.5);
    }

    function submitHandler(event) {
        event.preventDefault();
        const inputs = document.querySelectorAll('input');
        let message = '';
        let isInputValid = true;
        inputs.forEach((input) => {
            let thisInvalid = true;
            if (validator.isEmpty(input.value)) {
                message = 'Vui lòng nhập trường này';
                thisInvalid = false;
            } else if (!validator.isLength(input.value, parseInt(input.min), parseInt(input.max))) {
                message = `Phải có độ dài từ ${input.min} đến ${input.max} ký tự`;
                thisInvalid = false;
            }
            if (input.name === 'email') {
                if (!validator.isEmail(input.value)) {
                    thisInvalid = false;
                    message = 'Email không hợp lệ';
                }
            }
            if (!thisInvalid) {
                isInputValid = thisInvalid;
                vibrateForm(styles.loginBox);
                let parentNode = input.parentNode;
                let messageNode = parentNode.querySelector('span');
                input.classList.add(styles.inputError);
                messageNode.innerText = message;
            }
        });
        if (isInputValid) {
            let data = {};
            inputs.forEach((input) => {
                data[input.name] = input.value;
            });
            dispatch(actions.setWaitingStatus('block'));
            axios
                .post(`${baseUrl}/api/v1/auth/authenticate`, data)
                .then((response) => {
                    localStorage.setItem('accessToken', response.data.token);
                    navigate('/', { replace: true });
                })
                .catch((error) => {
                    console.log(error.message);
                    if (error.response != undefined) {
                        if (error.response.status == 405)
                            dispatch(
                                actions.setNotify({
                                    type: 'warning',
                                    content: 'Tên tài khoản hoặc mật khẩu không đúng.',
                                    display: 'block',
                                }),
                            );
                    } else {
                        dispatch(
                            actions.setNotify({
                                type: 'error',
                                content: 'Lỗi mạng.',
                                display: 'block',
                            }),
                        );
                    }
                })
                .finally(() => {
                    dispatch(actions.setWaitingStatus(false));
                });
        }
    }

    function onblurHandler(event) {
        if (event.target.classList.contains(styles.inputError)) {
            event.target.classList.remove(styles.inputError);
            let parentNode = event.target.parentNode;
            let messageNode = parentNode.querySelector('span');
            messageNode.innerText = '';
        }
    }
    return (
        <React.Fragment>
            <div className={styles.loginBox}>
                <p>
                    Đăng nhập
                    <img src="logo.png"></img>
                </p>
                <form>
                    <div className={styles.userBox}>
                        <input name="email" type="text" onInput={onblurHandler} min={3} max={50} />
                        <span></span>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={styles.userBox}>
                        <input name="password" type="password" onInput={onblurHandler} min={5} max={10} />
                        <label htmlFor="password">Mật khẩu</label>
                        <span></span>
                        <a href="" className={styles.forgotPassword}>
                            Quên mật khẩu
                        </a>
                    </div>
                    <a onClick={submitHandler} className={styles.submit}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Đăng nhập
                    </a>
                </form>
                <p>
                    Bạn chưa có tài khoản?{' '}
                    <Link to="/register" className={styles.register}>
                        Đăng ký!
                    </Link>
                </p>
            </div>
            <Copyright />
        </React.Fragment>
    );
}
export default LoginForm;
