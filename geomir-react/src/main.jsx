import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <Provider store={store}>
        
            <App />
    </Provider>
    </BrowserRouter>

    
)

