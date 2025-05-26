import React,{ StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove the loader once React is ready
const loader = document.getElementById('initial-loader');
if (loader) loader.remove();
