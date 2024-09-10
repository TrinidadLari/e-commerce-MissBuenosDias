import React from 'react'
import { Link } from 'react-router-dom'

export const Welcome = () => {
  return (
    <>
      <h1>Bienvenido a Home</h1>
      <Link to="/gridcards">
        <button>Ingresar</button>
      </Link>
    </>
  )
}
