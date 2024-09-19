import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const History = () => {
  const { buys } = useContext(CartContext);

  return (
    <Box sx={{ padding: 2, backgroundColor: 'background.paper', }}>
      <Typography variant="h4" gutterBottom sx={{
        padding: 2, textAlign: 'center'
      }}>
        Historial de Compras
      </Typography>


      {buys.map((buy) => (
        <Box
          key={buy.id}
          sx={{
            marginBottom: 2,
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: '2px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Fecha: {new Date(buy.date).toLocaleString()}
          </Typography>
          <List>
            {buy.items.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemAvatar>
                  <Avatar src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total de la compra: ${buy.total.toFixed(2)}
          </Typography>
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/gridcards`}
          sx={{ px: 10 }}
        >
          Volver a galería
        </Button>
      </Box>
    </Box>
  );
}