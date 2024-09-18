import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, Popover } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { CartDrawer } from '../components/CartDrawer';

export const ProductDetails = () => {
  const { id } = useParams();
  const { products, toggleLike } = useContext(ProductsContext);
  const { cart, addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id, products]);

  const handleLikeChange = () => {
    if (product) {
      toggleLike(id, product.like);
    }
  };

  const handleAddToCart = (event) => {
    const isProductInCart = cart.find(item => item.id === product.id);

    if (isProductInCart) {
      setAnchorEl(event.currentTarget);
    } else {
      addToCart(product, 1);
      setDrawerOpen(true);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'simple-popover' : undefined;

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <Box display="flex" justifyContent="center" py={5} sx={{ backgroundColor: "background.default" }}>
      <Card sx={{ width: 320 }}>
        <CardContent>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              overflow: 'hidden',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={product.like}
            onChange={handleLikeChange}
          />
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h6">${product.price}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" sx={{ fontSize: '12px' }} component={Link} to={`/gridcards`}>
              Volver
            </Button>
            <Button variant="contained" sx={{ fontSize: '12px' }} onClick={handleAddToCart}>
              Agregar al carrito
            </Button>
            <Popover
              id={popoverId}
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Typography sx={{ p: 2 }}>Este artículo ya está en el carrito</Typography>
            </Popover>
          </Box>
        </CardContent>
      </Card>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Box>
  );
};
