import React from 'react'
import { GridCards } from '../pages/GridCards.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductDetails } from '../pages/ProductDetails.jsx';
import { Register } from '../pages/Register.jsx';


export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/gridcards" element={<GridCards />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}
