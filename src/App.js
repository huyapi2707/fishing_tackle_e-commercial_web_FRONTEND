import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/login';
import MainPage from './pages/mainpage';
import RegisterForm from './pages/register';
import Verify from './pages/verifyaccount';
import ProductDetails from './pages/productDetails';
import { useGlobalContext } from './store';
import Loading from './components/loading';
import Notify from './components/notify';
function App() {
    const [state, dispatch] = useGlobalContext();
    return (
        <div className="App">
            {state['waiting'] && <Loading></Loading>}
            {state['notify']['display'] && <Notify></Notify>}
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/product" element={<ProductDetails />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/verify" element={<Verify />} />
            </Routes>
        </div>
    );
}

export default App;
