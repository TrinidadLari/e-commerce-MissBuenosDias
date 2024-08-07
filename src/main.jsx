import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Navbar } from './Navbar'
import './index.css'

// import { ProductsProvider } from './context/ProductsContext.jsx'

console.log('main.jsx is executing');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ProductsProvider> */}
    <Navbar />
    <App />
    {/* </ProductsProvider> */}
  </React.StrictMode>,
)
