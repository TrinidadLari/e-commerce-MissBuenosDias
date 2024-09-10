import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './Main.jsx';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';

export const MainLayout = ({ mode, setMode }) => {
  return (
    <>
      <Header mode={mode} setMode={setMode} />
      <Main />
      <Footer />
    </>
  )
}
