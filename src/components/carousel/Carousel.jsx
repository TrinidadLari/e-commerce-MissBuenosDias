import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { NotFound } from '../NotFound';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import './style.css'

export const Carousel = ({ closeModal, searchText }) => {
  const { products, error } = useContext(ProductsContext);
  const navigate = useNavigate();

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(products)) {
    return <div>No se encuentran productos</div>;
  }

  const handleCardClick = (productId) => {
    closeModal();
    navigate(`/productdetails/${productId}`);
  };


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <SwiperSlide key={product.id} onClick={() => handleCardClick(product.id)} style={{ cursor: 'pointer' }}>
              <img src={product.image} alt={product.name} style={{ marginBottom: '10px' }} />
              <div>
                <h3>{product.name}</h3>
                <p>{`$${product.price}`}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <NotFound />
        )}
      </Swiper>
    </>
  );
}