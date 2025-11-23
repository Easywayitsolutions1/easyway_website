import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';

import './style/index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css'
createRoot(document.getElementById('root')!).render(
    <App />
)