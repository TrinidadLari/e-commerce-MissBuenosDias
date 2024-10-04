import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/gridcards');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant="h2" color="error">
        404
      </Typography>
      <Typography variant="h4">
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Lo sentimos, la página que buscas no existe.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackHome}
        sx={{ mt: 4 }}
      >
        Volver a inicio
      </Button>
    </Box>
  )
}
