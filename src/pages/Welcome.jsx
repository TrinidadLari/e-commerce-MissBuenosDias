import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { useTheme } from '@mui/material';
import { Button, Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import { NotFound } from '../components/NotFound';
import { Register } from '../pages/Register';
import '../components/carousel/style.css'


export const Welcome = () => {
  const theme = useTheme();
  const { products, error } = useContext(ProductsContext);

  if (error) {
    return <NotFound />;
  }


  if (!Array.isArray(products)) {
    return <div>No se encuentran productos</div>;
  }

  return (
    <>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>

          Hola! Que lindo verte por aquí 🤍

        </Typography>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {products.length > 0 ? (
            products.map(product => (
              <SwiperSlide key={product.id} >
                <img src={product.image} alt={product.name} style={{ marginBottom: '10px', maxWidth: '200px' }} />
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