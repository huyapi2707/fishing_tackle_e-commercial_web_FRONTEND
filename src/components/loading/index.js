import { useGlobalContext } from '../../store';
import styles from './Loading.module.css';
function Loading() {
    const [state, dispatch] = useGlobalContext();
    return (
        <div className={styles.loader} style={{ display: state['waiting'] }}>
            <div className={[styles.justifyContentCenter, styles.jimuPrimaryLoading].join(' ')}></div>
        </div>
    );
}
export default Loading;
