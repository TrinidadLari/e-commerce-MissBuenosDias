import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export const GoToLogin = ({ onClose }) => {
  const handleGoToLogin = () => {
    onClose();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', marginInline: '8px' }}>
      <h3>Debes iniciar sesión para continuar</h3>
      <Button variant='contained' my="12px" component={Link} to={`/register`
      } sx={{ width: "80%", mx: "auto", mt: 2 }} onClick={handleGoToLogin}>Iniciar sesión</Button>
    </div>

  )
}
