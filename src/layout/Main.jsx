import React from 'react'
import { GridCards } from '../pages/GridCards.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@mui/icons-material';


export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gridcards" element={<GridCards />} />
      </Routes>
    </>
  )
}
