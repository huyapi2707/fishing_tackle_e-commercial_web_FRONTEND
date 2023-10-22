import styles from './Verify.module.css';
import { useGlobalContext, actions } from '../../store';
import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { BACK_END_URL as baseUrl } from '../../store/constants';
import Copyright from '../../components/copyrightFooter';
function Verify() {
    const [state, dispatch] = useGlobalContext();
    const navigate = useNavigate();
    function validate() {
        const inputs = document.querySelectorAll('input');
        let valid = true;
        inputs.forEach((input) => {
            let thisIsValid = true;
            if (input.value === '' || input.value === ' ') thisIsValid = false;
            if (!thisIsValid) {
                input.classList.add(styles.inputError);
            }
            valid = thisIsValid;
        });
        return valid;
    }
    function submitHandler(e) {
        e.preventDefault();
        let inputValid = validate();
        if (!inputValid) {
            vibrateForm(styles.form);
        } else {
            const inputs = Array.from(document.querySelectorAll('input'));
            let data = inputs.reduce((total, input, index) => {
                total += input.value.toUpperCase();
                if (index === 2) total += '-';
                return total;
            }, '');
            dispatch(actions.setWaitingStatus(true));
            axios
                .post(`${baseUrl}/api/v1/auth/verifyAccount?code=${data}`)
                .then((response) => {
                    let token = response.data.token;
                    localStorage.setItem('accessToken', token);
                    navigate('/', { replace: true });
                })
                .catch((error) => {
                    if (error.response !== undefined) {
                        if (error.response.status === 405) {
                            dispatch(
                                actions.setNotify({
                                    display: 'block',
                                    type: 'warning',
                                    content: 'Mã xác nhận không hợp lệ.',
                                }),
                            );
                        }
                    } else {
                        dispatch(
                            actions.setNotify({
                                display: 'block',
                                type: 'error',
                                content: 'Lỗi mạng.',
                            }),
                        );
                    }
                })
                .finally(() => {
                    dispatch(actions.setWaitingStatus(false));
                });
        }
    }

    function onInputHandler(e) {
        if (e.target.classList.contains(styles.inputError)) {
            e.target.classList.remove(styles.inputError);
        }
    }

    function vibrateForm(formClass) {
        let form = document.querySelector(`.${formClass}`);
        if (form.classList.contains(styles.vibrate)) {
            form.classList.remove(styles.vibrate);
        }
        setTimeout(() => {
            form.classList.add(styles.vibrate);
        }, 0.5);
    }

    return (
        <React.Fragment>
            <form className={styles.form}>
                <p className={[styles.heading, styles.title].join(' ')}>Xác nhận qua email</p>
                <div className={styles.box}>
                    <input className={styles.input} type="text" maxLength="1" onInput={onInputHandler} />
                    <input className={styles.input} type="text" maxLength="1" onInput={onInputHandler} />
                    <input className={styles.input} type="text" maxLength="1" onInput={onInputHandler} />
                    <input className={styles.input} type="text" maxLength="1" onInput={onInputHandler} />
                    <input className={styles.input} type="text" maxLength="1" onInput={onInputHandler} />
                    <input className={styles.input} type="text" maxLength="1" onInput={onInputHandler} />
                </div>
                <button className={styles.btn1} onClick={submitHandler}>
                    Xác nhận
                </button>
            </form>
            <Copyright />
        </React.Fragment>
    );
}

export default Verify;
