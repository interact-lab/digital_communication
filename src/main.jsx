import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

console.log('Main.jsx: Initializing React root...');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename="/digital_communication">
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
