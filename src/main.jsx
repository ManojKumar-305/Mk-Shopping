import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import { CartProvider } from './context/CartContext'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <Toaster position="top-right"
              toastOptions={{
                duration: 3000,
              }}
            />
            <App />
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
