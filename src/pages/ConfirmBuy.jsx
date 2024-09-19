import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';

export const ConfirmBuy = () => {
  const { cart, handleConfirmBuy } = useContext(CartContext);

  const handleConfirm = async () => {
    await handleConfirmBuy();

    console.log("Compra confirmada");
  };

  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <>
      <Box sx={{ padding: 2, backgroundColor: 'background.paper', }}>
        <Typography variant="h4" gutterBottom sx={{
          padding: 2, textAlign: 'center'
        }}>
          Detalles de la compra:
        </Typography>

        <Box component="form"
          sx={{
            marginBottom: 2,
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: '2px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Fecha: {new Date().toLocaleDateString()}
          </Typography>
          <List>
            {cart.map((product) => (
              <ListItem divider key={product.id}>
                <ListItemAvatar>
                  <Avatar src={product.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Cantidad: ${product.quantity} - Precio: $${product.price}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total de la compra: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>


        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            my: 4
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/gridcards`}
            sx={{ px: 10 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            component={Link}
            to={`/gridcards`}
            sx={{ px: 10 }}
          >
            Confirmar compra
          </Button>
        </Box>
      </Box>

    </>
  )
}
