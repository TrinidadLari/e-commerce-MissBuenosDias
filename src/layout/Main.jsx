import React from 'react'
import { GridCards } from '../pages/GridCards.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductDetails } from '../pages/ProductDetails.jsx';
import { Register } from '../pages/Register.jsx';
import { Profile } from '../pages/Profile.jsx';
import { History } from '../pages/History.jsx';
import { ConfirmBuy } from '../pages/ConfirmBuy.jsx';


export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/gridcards" element={<GridCards />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/confirmbuy" element={<ConfirmBuy />} />
      </Routes>
    </>
  )
}
