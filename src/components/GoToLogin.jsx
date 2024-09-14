import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export const GoToLogin = () => {
  return (
    < Typography component={Link} to={`/register`
    } textAlign="center"
      my="12px">Inicia sesión!</Typography>
  )
}
