import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { GoToLogin } from './GoToLogin';
import { Button } from '@mui/material';

export const CartDrawer = ({ open, onClose }) => {


  const list = () => (
    <Box display="flex"
      justifyContent="center"
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        <ListItem disablePadding>
          <Box display="flex" alignItems="center" mb={2} sx={{ border: "2px solid black" }}>
            <img
              src=""
              alt=""
              style={{ width: '50px', marginRight: '10px' }}
            />
            <Box>
              <Typography variant="body1">Nombre</Typography>
              <Typography variant="body2">Precio x cantidad</Typography>
            </Box>
          </Box>
        </ListItem>
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
        <GoToLogin />
        <Typography textAlign="center"
          my="12px"> Hola, user! </Typography>

        {list()}

        <Button variant='contained' sx={{ width: "80%", m: "auto" }}>Confirmar compra</Button>
      </SwipeableDrawer>
    </>
  );
}; 