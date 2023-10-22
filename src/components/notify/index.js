import styles from './notify.module.css';
import { actions, useGlobalContext } from '../../store';
import { AiOutlineClose, AiFillWarning } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { BiSolidMessageAltError } from 'react-icons/bi';
function Notify() {
    const [state, dispatch] = useGlobalContext();
    function renderIcon() {
        switch (state['notify']['type']) {
            case 'success': {
                return (
                    <div className={[styles.iconCircle, styles.success].join(' ')}>
                        <BsCheckLg></BsCheckLg>
                    </div>
                );
            }
            case 'error': {
                return (
                    <div className={[styles.iconCircle, styles.error].join(' ')}>
                        <BiSolidMessageAltError></BiSolidMessageAltError>
                    </div>
                );
            }
            case 'warning': {
                return (
                    <div className={[styles.iconCircle, styles.warning].join(' ')}>
                        <AiFillWarning></AiFillWarning>
                    </div>
                );
            }
        }
    }
    return (
        <div
            className={styles.container}
            style={{
                display: state['notify']['display'],
            }}
        >
            <div
                className={styles.close}
                onClick={(e) => {
                    dispatch(
                        actions.setNotify({
                            display: 'none',
                            type: '',
                            content: '',
                        }),
                    );
                }}
            >
                <AiOutlineClose></AiOutlineClose>
            </div>
            <div className={styles.icon}>{renderIcon()}</div>
            <div className={styles.content}>
                <p>{state['notify']['content']}</p>
            </div>
        </div>
    );
}

export default Notify;
