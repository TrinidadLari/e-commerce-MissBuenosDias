import React from 'react'
import { Box, Link, Container, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Container
        as="footer"
        position="static"
        sx={{
          minWidth: '100%',
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper,
          padding: '16px',
          color: theme.palette.text.primary,
        }}
      >
        <Box >
          <Typography>
            Cada pieza cuenta una historia, hecha a mano para conectar contigo
          </Typography>
          <Link
            href="https://www.instagram.com/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            underline="none"
          >
            <InstagramIcon sx={{ fontSize: 40, p: 2 }} />
          </Link>
          <Link
            href="https://www.instagram.com/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
          >
            <WhatsAppIcon sx={{ fontSize: 40, p: 2 }} />
          </Link>

          <Link
            href="https://www.instagram.com/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
          >
            <InstagramIcon sx={{ fontSize: 40, p: 2 }} />
          </Link>
          <Typography>
            Encuentra nuestras creaciones también en ferias locales y tiendas exclusivas
          </Typography>
        </Box>
      </Container>
    </>
  )
}
