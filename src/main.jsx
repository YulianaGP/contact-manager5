// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
import { ContactsProvider } from './context/ContactsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContactsProvider>
  </StrictMode>
);
