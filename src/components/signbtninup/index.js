import styles from './Btn.module.css';
import { Link } from 'react-router-dom';
function Btns() {
    return (
        <div className={styles.container}>
            <Link to={'/login'} className={styles.login}>
                Đăng nhập
                <span className={styles.b1}></span>
                <span className={styles.b1}></span>
                <span className={styles.b1}></span>
                <span className={styles.b1}></span>
            </Link>
            <Link to={'/register'} className={styles.register}>
                Đăng ký
                <span className={styles.b1}></span>
                <span className={styles.b1}></span>
                <span className={styles.b1}></span>
                <span className={styles.b1}></span>
            </Link>
        </div>
    );
}

export default Btns;
