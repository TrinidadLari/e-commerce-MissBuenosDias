import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'



import { ProductsProvider } from './context/ProductsContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

console.log('main.jsx is executing');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
