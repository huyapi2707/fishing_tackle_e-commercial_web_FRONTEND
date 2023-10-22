import { useEffect } from 'react';
import styles from './ScrollTop.module.css';

function ScrollTop() {
    useEffect(() => {
        const myButton = document.getElementById('headerButton');
        window.onscroll = () => {
            if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 600) {
                myButton.style.display = 'flex';
            } else {
                myButton.style.display = 'none';
            }
        };
    });
    return (
        <button
            className={styles.Btn}
            onClick={() => {
                window.scroll({ top: 0, behavior: 'smooth' });
            }}
            id="headerButton"
        >
            <svg height="2em" className={styles.arrow} viewBox="0 0 512 512">
                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
            </svg>
            <p className={styles.text}>Lân đầu</p>
        </button>
    );
}

export default ScrollTop;
