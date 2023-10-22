import Context from './Context';
import { useContext } from 'react';
export const useGlobalContext = () => {
    const [state, dispatch] = useContext(Context);
    return [state, dispatch];
};
