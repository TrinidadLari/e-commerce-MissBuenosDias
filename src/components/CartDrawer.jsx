import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { GoToLogin } from './GoToLogin';
import { Counter } from './Counter';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearIcon from '@mui/icons-material/Clear';



export const CartDrawer = ({ open, onClose }) => {
  const { user, nickname } = useContext(AuthContext);
  const { cart, addToCart, removeFromCart, removeAllFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleConfirmBuy = () => {
    onClose();
    navigate('/confirmBuy');
  };

  const handleQuantityChange = (product, quantity) => {
    if (quantity <= product.stock) {
      addToCart(product, quantity - product.quantity);
    }
  };

  const handleClearCart = () => {
    removeAllFromCart();
  };


  const list = () => (
    <Box display="flex"
      justifyContent="center"
      role="presentation"
    >


      <List>
        {cart.length > 0 ? (
          cart.map((product) => (
            <ListItem key={product.id} disablePadding>
              <Box display="flex" alignItems="center" m={1} sx={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "2px", }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ClearIcon sx={{ m: 2, cursor: 'pointer' }} onClick={() => removeFromCart(product.id)} />
                </Box>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ height: '100px', marginRight: '10px' }}
                />
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                  <Typography variant="body1" mx={2}>{product.name}</Typography>
                  <Typography variant="body3" mx={2}>{product.stock} Disponibles</Typography>
                  <Counter stock={product.stock} quantity={product.quantity} onQuantityChange={(newQuantity) => handleQuantityChange(product, newQuantity)} />
                  <Typography variant="body2"> {product.price} x {product.quantity} = {product.price * product.quantity}</Typography>

                </Box>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" textAlign="center" mx={2}>
            No tienes productos en el carrito.
          </Typography>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={onClose}
        onOpen={() => { }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BackspaceIcon sx={{ m: 2, cursor: 'pointer' }} onClick={onClose} />
        </Box>
        {!user ? (
          <GoToLogin />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Box>
              <Typography textAlign="center" my="12px">
                Hola {nickname}!
              </Typography>
              {list()}
            </Box>
            {cart.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Button variant='contained' onClick={handleConfirmBuy} sx={{ width: "80%" }}>
                  Confirmar compra
                </Button>
                <Button variant='contained' onClick={handleClearCart} sx={{ width: "80%", mt: 1 }}>
                  Vaciar carrito
                </Button>
              </Box>
            )}
          </Box>
        )}
      </SwipeableDrawer>
    </>
  );
}
