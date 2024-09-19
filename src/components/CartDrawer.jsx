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



export const CartDrawer = ({ open, onClose }) => {
  const { user, nickname } = useContext(AuthContext);
  const { cart, addToCart } = useContext(CartContext);
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


  const list = () => (
    <Box display="flex"
      justifyContent="center"
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >


      <List>
        {cart.length > 0 ? (
          cart.map((product) => (
            <ListItem key={product.id} disablePadding>
              <Box display="flex" alignItems="center" m={1} sx={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "2px", }}>
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
        {!user ? (
          <GoToLogin />
        ) : (
          <>
            <Typography textAlign="center" my="12px">
              Hola {nickname}!
            </Typography>
            {list()}
            {cart.length > 0 && (
              <Button variant='contained' onClick={handleConfirmBuy} sx={{ width: "80%", m: "auto" }}>Confirmar compra</Button>
            )}
          </>
        )}

      </SwipeableDrawer>
    </>
  );
};









