import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { GoToLogin } from './GoToLogin';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';



export const CartDrawer = ({ open, onClose }) => {
  const { user, nickname } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleConfirmBuy = () => {
    onClose();
    navigate('/confirmBuy');
  };


  const list = () => (
    <Box display="flex"
      justifyContent="center"
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >


      <List>
        {cart.length > 0 ? (
          cart.map((product) => (
            <ListItem key={product.id} disablePadding>
              <Box display="flex" alignItems="center" mb={2} sx={{ border: "2px solid black" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '50px', marginRight: '10px' }}
                />
                <Box>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body2"> {product.price} x {product.quantity} = {product.price * product.quantity}</Typography>
                </Box>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" textAlign="center">
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









