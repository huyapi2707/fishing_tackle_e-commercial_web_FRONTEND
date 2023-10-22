import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalProvider>,
);

reportWebVitals();
