import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProductsContext } from '../context/ProductsContext';
import { useTheme } from '@mui/material';
import { Box, Typography, Modal } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import BackspaceIcon from '@mui/icons-material/Backspace';
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
  borderRadius: '2px',
  boxShadow: 24,
  p: 2,
};


export const Fav = ({ open, onClose }) => {
  const theme = useTheme();
  const { products, error } = useContext(ProductsContext);
  const { likes } = useContext(AuthContext);
  const navigate = useNavigate();

  if (error) {
    return <NotFound />;
  }


  if (!Array.isArray(products)) {
    return <div>No se encuentran productos</div>;
  }

  const likedProducts = products.filter(product => likes[product.id]);

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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BackspaceIcon sx={{ mb: 2, cursor: 'pointer' }} onClick={onClose} />
          </Box>
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
            {likedProducts.length > 0 ? (
              likedProducts.map(product => (
                <SwiperSlide key={product.id} onClick={() => handleCardClick(product.id)}  >
                  <img src={product.image} alt={product.name} style={{ marginBottom: '10px', maxWidth: '200px' }} />
                </SwiperSlide>
              ))
            ) : (
              <NotFound />
            )}
          </Swiper>
        </Box>
      </Modal>
    </div>
  );
};
