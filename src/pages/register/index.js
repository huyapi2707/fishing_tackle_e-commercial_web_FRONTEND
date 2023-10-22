import styles from './Register.module.css';
import validator from 'validator';
import axios from 'axios';
import { useGlobalContext, actions } from '../../store';
import React from 'react';

import { useNavigate } from 'react-router-dom';

import { BACK_END_URL as baseUrl } from '../../store/constants';
import Copyright from '../../components/copyrightFooter';

function LoginForm() {
    const [state, dispatch] = useGlobalContext();
    const navigate = useNavigate();

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
            if (input.name === 'repassword') {
                let password = document.querySelector('input[name="password"]');
                if (password.value !== input.value) {
                    thisInvalid = false;
                    message = 'Xác nhận mật khẩu không đúng';
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
            delete data['repassword'];
            data.role = 'USER';
            dispatch(actions.setWaitingStatus('block'));
            axios
                .post(`${baseUrl}/api/v1/auth/register`, data)
                .then((response) => {
                    navigate('/verify', { replace: true });
                })
                .catch((error) => {
                    console.log(error.message);
                    if (error.response != undefined) {
                        if (error.response.status == 405) {
                            dispatch(
                                actions.setNotify({
                                    type: 'warning',
                                    content: 'Tên tài khoản hoặc mật khẩu không đúng.',
                                    display: 'block',
                                }),
                            );
                        }
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
                    dispatch(actions.setWaitingStatus('none'));
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
                    Đăng ký
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
                    </div>
                    <div className={styles.userBox}>
                        <input name="repassword" type="password" onInput={onblurHandler} min={5} max={10} />
                        <label htmlFor="repassword">Xác nhận mật khẩu</label>
                        <span></span>
                    </div>
                    <a onClick={submitHandler} className={styles.submit}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Đăng ký
                    </a>
                </form>
            </div>
            <Copyright />
        </React.Fragment>
    );
}
export default LoginForm;
