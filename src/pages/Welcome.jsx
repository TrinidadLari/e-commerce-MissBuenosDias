import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import cat from '../../public/cat-in-black.svg'
import { useTheme } from '@mui/material';
import { Container, TextField, InputAdornment, IconButton, Button, Box, Typography, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { NotFound } from '../components/NotFound';
import { Register } from '../components/Register';


export const Welcome = () => {
  const theme = useTheme();
  const { products, error } = useContext(ProductsContext);

  if (error) {
    return <div>{error}</div>;
  }

  // Validar que products es un array
  if (!Array.isArray(products)) {
    return <div>Invalid products data</div>;
  }
  console.log("AQUI HAY", products);
  console.log('SwiperSlides Count:', products.length);

  return (
    <>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.paper, // Use dark mode background color
          color: theme.palette.text.primary, // Use dark mode text color
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>

          Hola! Que lindo verte por aquí

        </Typography>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {products.length > 0 ? (
            products.map(product => (
              <SwiperSlide key={product.id}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Asegura que el contenido se distribuya
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: theme.palette.background.paper,
                    width: '250px',  // Tamaño fijo pero más ancho
                    height: '350px', // Altura fija pero más baja
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Añadir sombra para resaltar las cards
                  }}
                >
                  {/* Imagen superior */}
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}  // Ajustar imagen al contenedor
                    />
                  </Box>

                  {/* Texto del producto */}
                  <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>{product.name}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{product.description}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{`$${product.price}`}</Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))
          ) : (
            <NotFound />
          )}
        </Swiper>
        <Link to="/gridcards" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, my: 3, width: '100%' }}>
            Ingresar
          </Button>
        </Link>

        <Register />
      </Box>
    </>
  )
}