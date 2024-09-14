import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { useTheme } from '@mui/material';
import { Button, Box, Typography, Modal } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import { NotFound } from '../components/NotFound';
import '../components/carousel/style.css'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const Fav = ({ open, onClose }) => {
  const theme = useTheme();
  const { products, error } = useContext(ProductsContext);
  const navigate = useNavigate();

  if (error) {
    return <NotFound />;
  }


  if (!Array.isArray(products)) {
    return <div>No se encuentran productos</div>;
  }

  const handleCardClick = (productId) => {
    onClose();
    navigate(`/productdetails/${productId}`);
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Productos favoritos:
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
                <SwiperSlide key={product.id} onClick={() => handleCardClick(product.id)}  >
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
        </Box>
      </Modal>
    </div>
  );
};
