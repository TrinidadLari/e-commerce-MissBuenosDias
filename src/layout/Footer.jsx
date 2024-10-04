import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material'
import { useTheme } from '@emotion/react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

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
          boxShadow: '0 -2px 8px rgba(255, 255, 255, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, my: 4 }}>
          <Button variant="contained" sx={{ fontSize: '12px', width: '200px' }} component={Link} to={`/`}>
            Inicio
          </Button>
          <Button variant="contained" sx={{ fontSize: '12px', width: '200px' }} component={Link} to={`/gridcards`}>
            Galería
          </Button>
        </Box>
        <Box >
          <Typography>
            Cada pieza cuenta una historia, hecha a mano para conectar contigo
          </Typography>
          <Link
            href="https://www.instagram.com/miss_buenosdias"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            underline="none"
          >
            <InstagramIcon sx={{ fontSize: 40, p: 2 }} />
          </Link>
          <Link
            href="https://wa.me/+5493413394356"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
          >
            <WhatsAppIcon sx={{ fontSize: 40, p: 2 }} />
          </Link>

          <Link
            href="https://www.facebook.com/marlen.breuning?mibextid=ZbWKwL "
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
          >
            <FacebookIcon sx={{ fontSize: 40, p: 2 }} />
          </Link>
          <Typography>
            Encuentra nuestras creaciones también en ferias locales y tiendas exclusivas
          </Typography>
          <Typography sx={{ fontSize: 12, p: 2, mt: 4 }}>
            e-commerce creado por Trinidad Lari, todos los derechos reservados
            <Link
              href="https://github.com/TrinidadLari"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
              underline="none"
            >
              <GitHubIcon sx={{ fontSize: 18, marginLeft: "8px" }} />
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  )
}
