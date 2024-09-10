import React from 'react'

import { Navbar } from '../components/Navbar';

export const Header = ({ mode, setMode }) => {


  return (
    <>
      <Navbar mode={mode} setMode={setMode} />
    </>
  )
}
